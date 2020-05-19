import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './shop.css';
import {
  Button,
  Div,
  Group,
  Header,
  Panel,
  PanelHeader,
  SimpleCell,
  Snackbar,
} from '@vkontakte/vkui';

import Icon28ErrorOutline from '@vkontakte/icons/dist/28/error_outline';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Icon64Russian from '../../../assets/Icons/icn64_rus.png';
import Icon64Math from '../../../assets/Icons/icn64_math.png';
import Icon64Litra from '../../../assets/Icons/icn64_litra.png';
import Icon64Physics from '../../../assets/Icons/icn64_physics.png';
import Icon64Chemistry from '../../../assets/Icons/icn64_chem.png';
import Icon64Astro from '../../../assets/Icons/icn64_astro.png';
import Icon64Biology from '../../../assets/Icons/icn64_bio.png';
import Icon64History from '../../../assets/Icons/icn64_history.png';
import Icon64Art from '../../../assets/Icons/icn64_art.png';
import Icon64Sport from '../../../assets/Icons/icn64_sport.png';
import Icon64Other from '../../../assets/Icons/icn64_other.png';
import Icon64Geography from '../../../assets/Icons/icn64_geography.png';
import globalVariables from '../../../GlobalVariables';
import RenderedCategories from './Components/RenderedCategories';

const Shop = (props) => {
  const {
    id, setActivePanel, setQuestionData, setPopoutShopView, popoutShopView, setActiveStory
  } = props;
  const pageCache = useSelector((state) => state.pageCache.shop);
  const [categories, setCategories] = useState(pageCache);

  const [renderedCategories, setRenderedCategories] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const userBalance = useSelector((state) => state.userInfo.coins.overall);
  const dispatch = useDispatch();

  function getIcon(category) {
    switch (category) {
      case 'Math':
        return Icon64Math;
      case 'Russian':
        return Icon64Russian;
      case 'Literature':
        return Icon64Litra;
      case 'Physics':
        return Icon64Physics;
      case 'Chemistry':
        return Icon64Chemistry;
      case 'Astronomy':
        return Icon64Astro;
      case 'Biology':
        return Icon64Biology;
      case 'History':
        return Icon64History;
      case 'Art':
        return Icon64Art;
      case 'Sport':
        return Icon64Sport;
      case 'Other':
        return Icon64Other;
      case 'Geography':
        return Icon64Geography;
      default:
        return '';
    }
  }

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

  useEffect(() => {
    const rendered = categories.map((item) => (
      <SimpleCell
        key={`ShopItem_${item._id}`}
        className="Shop--item"
        disabled
        after={(
          <Button
            mode="secondary"
            onClick={() => {
              checkBalance(item.name, item.price);
            }}
          >
            {`${item.price} монет`}
          </Button>
        )}
        before={(
          <div className="Shop--iconOuter">
            <div className="Shop--icon" style={{ backgroundImage: `url(${getIcon(item.name)})` }} />
          </div>
        )}
      >
        {globalVariables.translateEnToRu(item.name)}
      </SimpleCell>
    ));
    setRenderedCategories(rendered);
  }, [categories]);

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
