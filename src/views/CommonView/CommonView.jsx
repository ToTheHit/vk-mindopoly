import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Epic, Root, ScreenSpinner, Tabbar, TabbarItem, View, } from '@vkontakte/vkui';
import Icon28MarketOutline from '@vkontakte/icons/dist/28/market_outline';
import Icon28UserCircleOutline from '@vkontakte/icons/dist/28/user_circle_outline';
import Icon28ListOutline from '@vkontakte/icons/dist/28/list_outline';
import bridge from '@vkontakte/vk-bridge';
import BrainLeaderboard from '../../panels/Common/Leaderboard/BrainLeaderboard';

import './commonView.css';
import Shop from '../../panels/Common/Shop/Shop';
import ShopQuestion from '../../panels/Common/Shop/ShopQuestion';
import EffectDetailsSelector from '../../panels/Common/EffectDetails/EffectDetailsSelector';
import Main from '../../panels/Common/Main/Main';
import QuestionDetails from '../../panels/Common/QuestionDetails/QuestionDetails';

const CommonView = (props) => {
  const { id, nextView } = props;
  const [activeStory, setActiveStory] = useState('MainRoot');

  // Main activity
  const [mainSelectedQuestion, setMainSelectedQuestion] = useState({});
  const [mainActivePanel, setMainActivePanel] = useState('Main');
  const [mainPopoutView, setMainPopoutView] = useState(true);
  const [mainHistory, setMainHistory] = useState(['Main']);

  useEffect(() => {
    if (mainActivePanel === 'Main') {
      setMainHistory(['Main']);
      bridge.send('VKWebAppDisableSwipeBack');
    } else {
      setMainHistory(((prevState) => [...prevState, mainActivePanel]));
      bridge.send('VKWebAppEnableSwipeBack');
    }
  }, [mainActivePanel]);

  const goBack = () => {
    const historyTemp = mainHistory;
    historyTemp.pop();
    setMainActivePanel(historyTemp[historyTemp.length - 1]);
  };

  // Shop activity
  const [shopActivePanel, setShopActivePanel] = useState('Shop');
  const [questionData, setQuestionData] = useState({});
  const [popoutShopView, setPopoutShopView] = useState(true);

  function changeStory(e) {
    setActiveStory(e.currentTarget.dataset.story);
  }

  return (
    <Epic
      id={id}
      activeStory={activeStory}
      tabbar={(
        <Tabbar>
          <TabbarItem
            onClick={changeStory}
            selected={activeStory === 'MainRoot'}
            data-story="MainRoot"
          >
            <Icon28UserCircleOutline height={28} width={28} />
          </TabbarItem>
          <TabbarItem
            onClick={changeStory}
            selected={activeStory === 'ShopRoot'}
            data-story="ShopRoot"
          >
            <Icon28MarketOutline height={28} width={28} />
          </TabbarItem>
          <TabbarItem
            onClick={changeStory}
            selected={activeStory === 'LeaderboardRoot'}
            data-story="LeaderboardRoot"
          >
            <Icon28ListOutline height={28} width={28} />
          </TabbarItem>
        </Tabbar>
      )}
    >
      <Root id="MainRoot" activeView="MainView">
        <View
          activePanel={mainActivePanel}
          id="MainView"
          // popout={(mainPopoutView && (<ScreenSpinner />))}
          onSwipeBack={goBack}
          history={mainHistory}
          modal={<EffectDetailsSelector />}
        >
          <Main
            id="Main"
            setActivePanel={setMainActivePanel}
            setSelectedQuestion={setMainSelectedQuestion}
            nextView={nextView}
            setActiveStory={setActiveStory}
            setPopoutMainView={setMainPopoutView}
            popoutMainView={mainPopoutView}
          />
          <QuestionDetails
            id="QuestionDetails"
            setActivePanel={setMainActivePanel}
            selectedQuestion={mainSelectedQuestion}
          />
        </View>
      </Root>

      <Root id="ShopRoot" activeView="ShopView">
        <View
          className="ShopView"
          activePanel={shopActivePanel}
          id="ShopView"
          popout={(popoutShopView && (<ScreenSpinner />))}
        >
          <Shop
            id="Shop"
            setActivePanel={setShopActivePanel}
            setQuestionData={setQuestionData}
            setPopoutShopView={setPopoutShopView}
            popoutShopView={false}
          />

          <ShopQuestion
            id="ShopQuestion"
            questionData={questionData}
            setActivePanel={setShopActivePanel}
          />
        </View>
      </Root>
      <Root id="LeaderboardRoot" activeView="LeaderboardView">
        <View activePanel="Leaderboard" id="LeaderboardView">
          <BrainLeaderboard id="Leaderboard" />
        </View>
      </Root>

    </Epic>
  );
};

CommonView.propTypes = {
  id: PropTypes.string.isRequired,
  nextView: PropTypes.func.isRequired,
};
CommonView.defaultProps = {};
export default CommonView;
