import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Epic, Panel, Tabbar, TabbarItem, View,
} from '@vkontakte/vkui';
import Icon28UserCircleOutline from '@vkontakte/icons/dist/28/user_circle_outline';
import Icon28MarketOutline from '@vkontakte/icons/dist/28/market_outline';
import Icon28ListOutline from '@vkontakte/icons/dist/28/list_outline';
import MainView from '../MainView/MainView';
import ShopView from '../ShopView/ShopView';
import BrainLeaderboard from '../../panels/Common/Leaderboard/BrainLeaderboard';

import './commonView.css';

const CommonView = (props) => {
  const { id, nextView } = props;
  const [activeStory, setActiveStory] = useState('Main');

  function changeStory(e) {
    setActiveStory(e.currentTarget.dataset.story);
  }

  return (
    <View
      id={id}
      activePanel="Common"
      header
      className="CommonView"
    >
      <Panel id="Common" className="CommonView__panel">

        <Epic
          activeStory={activeStory}
          tabbar={(
            <Tabbar>
              <TabbarItem
                onClick={changeStory}
                selected={activeStory === 'Main'}
                data-story="Main"
              >
                <Icon28UserCircleOutline height={28} width={28} />
              </TabbarItem>
              <TabbarItem
                onClick={changeStory}
                selected={activeStory === 'Shop'}
                data-story="Shop"
              >
                <Icon28MarketOutline height={28} width={28} />
              </TabbarItem>
              <TabbarItem
                onClick={changeStory}
                selected={activeStory === 'Leaderboard'}
                data-story="Leaderboard"
              >
                <Icon28ListOutline height={28} width={28} />
              </TabbarItem>
            </Tabbar>
          )}
        >
          <MainView id="Main" nextView={nextView} setActiveStory={setActiveStory} />

          <ShopView id="Shop" />

          <View activePanel="Leaderboard" id="Leaderboard">
            <BrainLeaderboard id="Leaderboard" />
          </View>

        </Epic>
      </Panel>

    </View>
  );
};

CommonView.propTypes = {
  id: PropTypes.string.isRequired,
  nextView: PropTypes.func.isRequired,
};
CommonView.defaultProps = {};
export default CommonView;
