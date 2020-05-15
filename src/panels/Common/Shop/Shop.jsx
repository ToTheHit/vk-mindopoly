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
import { useSelector } from 'react-redux';

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

const Shop = (props) => {
  const {
    id, setActivePanel, setQuestionData, setPopoutShopView, popoutShopView,
  } = props;
  const [categories, setCategories] = useState([]);
  const [renderedCategories, setRenderedCategories] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const userBalance = useSelector((state) => state.userInfo.coins.overall);

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
        console.info(data);
        setCategories(data.data);
        setPopoutShopView(false);
      })
      .catch((err) => {
        console.info('Main, get/userQuestions', err);
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
          Вам не хватает монет для покупки этого вопроса.
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
