import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './shop.css';
import {
  Group, Panel, PanelHeader, Header, Button, SimpleCell, Div, Snackbar,
} from '@vkontakte/vkui';

import Icon28ErrorOutline from '@vkontakte/icons/dist/28/error_outline';

import axios from 'axios';
import { useSelector } from 'react-redux';
import Icon32Russian from '../../../assets/StartPanel/blueIcons/icn32_russian.png';
import Icon32Math from '../../../assets/StartPanel/blueIcons/icn32_sigma.png';
import Icon32Litra from '../../../assets/StartPanel/blueIcons/icn32_litra.png';
import Icon32Physics from '../../../assets/StartPanel/blueIcons/icn32_genius.png';
import Icon32Chemistry from '../../../assets/StartPanel/blueIcons/icn32_chemistry.png';
import Icon32Astro from '../../../assets/StartPanel/blueIcons/icn32_moon.png';
import Icon32Biology from '../../../assets/StartPanel/blueIcons/icn32_biology.png';
import Icon32History from '../../../assets/StartPanel/blueIcons/icn32_history.png';
import Icon32Art from '../../../assets/StartPanel/blueIcons/icn32_art.png';
import Icon32Sport from '../../../assets/StartPanel/blueIcons/icn32_sport.png';
import Icon32Other from '../../../assets/StartPanel/blueIcons/icn32_other.png';
import Icon32Geography from '../../../assets/StartPanel/blueIcons/icn32_geography.png';
import globalVariables from '../../../GlobalVariables';


const Shop = (props) => {
  const {
    id, setActivePanel, setQuestionData, setPopoutShopView, popoutShopView,
  } = props;
  const [categories, setCategories] = useState([]);
  const [renderedCategories, setRenderedCategories] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const userBalance = useSelector((state) => state.userInfo.coins);

  function getIcon(category) {
    switch (category) {
      case 'Math': return Icon32Math;
      case 'Russian': return Icon32Russian;
      case 'Literature': return Icon32Litra;
      case 'Physics': return Icon32Physics;
      case 'Chemistry': return Icon32Chemistry;
      case 'Astronomy': return Icon32Astro;
      case 'Biology': return Icon32Biology;
      case 'History': return Icon32History;
      case 'Art': return Icon32Art;
      case 'Sport': return Icon32Sport;
      case 'Other': return Icon32Other;
      case 'Geography': return Icon32Geography;
      default: return '';
    }
  }

  const checkBalance = useCallback((category, price) => {
    if (userBalance >= price) {
      setQuestionData({ category, price });
      setActivePanel('ShopQuestion');
    } else {
      setShowSnackbar(true);
    }
  }, [setActivePanel, setQuestionData, userBalance]);

  useEffect(() => {
    axios.get(`${globalVariables.serverURL}/api/getCategoriesState`, {
      params: {
      },
    })
      .then((data) => {
        setCategories(data.data);
        setPopoutShopView(false);
      })
      .catch((err) => {
        console.info('Main, get/userQuestions', err);
        // Сервер не нашёл токен в БД.
        // Перемещение на стартовый экран
      });
  }, [setPopoutShopView, checkBalance]);



  useEffect(() => {
    const rendered = categories.map((item) => (
      <SimpleCell
        key={`ShopItem_${item.name}`}
        className="Shop--item"
        disabled
        after={(
          <Button
            mode="secondary"
            onClick={() => { checkBalance(item.name, item.price); }}
          >
            {`${item.price} марок`}
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
  }, [categories, checkBalance]);

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
          Вам не хватает марок для покупки этого вопроса.
        </Snackbar>
      )}

      {!popoutShopView && (
        <Group
          header={(
            <Header>
              Вопросы
            </Header>
          )}
        >
          <Div>
            {renderedCategories}
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
};
Shop.defaultProps = {};
export default Shop;
