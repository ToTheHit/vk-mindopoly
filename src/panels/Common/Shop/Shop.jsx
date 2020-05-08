import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './shop.css';
import {
  Group, Panel, PanelHeader, ScreenSpinner, Header, Button, SimpleCell, Div,
} from '@vkontakte/vkui';

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
  const { id, setActivePanel, setQuestionData } = props;
  const [showScreen, setShowScreen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [renderedCategories, setRenderedCategories] = useState([]);

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

  useEffect(() => {
    setTimeout(() => {
      setShowScreen(true);
      const themesFromServer = [
        {
          category: 'Math',
          cost: 20,
        },
        {
          category: 'Russian',
          cost: 25,
        },
      ];
      setCategories(themesFromServer);
    }, 1000);
  }, []);

  useEffect(() => {
    const rendered = categories.map((item) => (
      <SimpleCell
        key={`ShopItem_${item.category}`}
        className="Shop--item"
        disabled
        after={(
          <Button
            mode="secondary"
            onClick={() => { setQuestionData({ category: item.category, cost: item.cost }); setActivePanel('ShopQuestion'); }}
          >
            {`${item.cost} марок`}
          </Button>
        )}
        before={(
          <div className="Shop--iconOuter">
            <div className="Shop--icon" style={{ backgroundImage: `url(${getIcon(item.category)})` }} />
          </div>
)}
      >
        {globalVariables.translateEnToRu(item.category)}
      </SimpleCell>
    ));
    setRenderedCategories(rendered);
  }, [categories]);

  return (
    <Panel id={id} className="Shop" centered={!showScreen}>
      <PanelHeader>
        Магазин
      </PanelHeader>
      {!showScreen && <ScreenSpinner />}
      {showScreen && (
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
};
Shop.defaultProps = {};
export default Shop;
