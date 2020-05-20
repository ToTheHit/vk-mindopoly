import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './shop.css';
import { Div, Group, Header, Panel, PanelHeader, Snackbar, } from '@vkontakte/vkui';

import Icon28ErrorOutline from '@vkontakte/icons/dist/28/error_outline';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import globalVariables from '../../../GlobalVariables';
import RenderedCategories from './Components/RenderedCategories';

const Shop = (props) => {
  const {
    id, setActivePanel, setQuestionData, setPopoutShopView, popoutShopView, setActiveStory,
  } = props;
  const pageCache = useSelector((state) => state.pageCache.shop);
  const [categories, setCategories] = useState(pageCache);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const userBalance = useSelector((state) => state.userInfo.coins.overall);
  const dispatch = useDispatch();

  const controlHardwareBackButton = useCallback(() => {
    setActiveStory(globalVariables.commonView.roots.main);
  }, []);
  useEffect(() => {
    // Алгоритм для обработки аппаратной кнопки "Назад" на андроидах
    window.history.pushState({ page: 'Shop' }, 'Shop', `${window.location.search}`);
    window.addEventListener('popstate', controlHardwareBackButton);
    return () => {
      window.removeEventListener('popstate', controlHardwareBackButton);
    };
  }, []);

  const checkBalance = useCallback((category, price) => {
    if (userBalance >= price) {
      setQuestionData({ category, price });
      setActivePanel('ShopQuestion');
    } else {
      setShowSnackbar(true);
    }
  }, [setActivePanel, setQuestionData, userBalance]);

  useEffect(() => {
    axios.get(`${globalVariables.serverURL}/api/getCategoriesState`)
      .then((data) => {
        // console.info(data);
        setCategories(data.data);
        dispatch({
          type: 'PAGE_CACHE',
          payload: { shop: data.data },
        });
        setPopoutShopView(false);
      })
      .catch((err) => {
        console.info('Main, get/userQuestions', err);
      });
    return () => {
      // setRenderedCategories([]);
    };
  }, []);

  return (
    <Panel id={id} className="Shop">
      <PanelHeader>
        Магазин
      </PanelHeader>
      {showSnackbar && (
        <Snackbar
          duration={2000}
          onClose={() => setShowSnackbar(false)}
          before={(
            <Icon28ErrorOutline height={24} width={24} style={{ color: 'var(--destructive)' }} />
          )}
        >
          Вам не хватает монет для покупки этого вопроса.
        </Snackbar>
      )}

      {!popoutShopView && (
        <Group
          header={(
            <Header
              subtitle="Чем больше вопросов в категории, тем выше их цена. Однако, дешёвые вопросы более востребованы и принесут больше GP."
            >
              Вопросы
            </Header>
          )}
        >
          <Div style={{ paddingTop: '4px' }}>
            <RenderedCategories checkBalance={checkBalance} categories={categories} />
          </Div>
        </Group>
      )}


    </Panel>
  );
};

Shop.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  setPopoutShopView: PropTypes.func.isRequired,
  popoutShopView: PropTypes.bool.isRequired,
  setActiveStory: PropTypes.func.isRequired,
};
Shop.defaultProps = {};
export default Shop;
