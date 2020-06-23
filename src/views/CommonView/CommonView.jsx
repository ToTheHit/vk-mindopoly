import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Epic, Root, ScreenSpinner, Tabbar, TabbarItem, View,
} from '@vkontakte/vkui';
import Icon28MarketOutline from '@vkontakte/icons/dist/28/market_outline';
import Icon28UserCircleOutline from '@vkontakte/icons/dist/28/user_circle_outline';
import Icon28ListOutline from '@vkontakte/icons/dist/28/list_outline';
import Icon20EducationOutline from '@vkontakte/icons/dist/20/education_outline';
import bridge from '@vkontakte/vk-bridge';
// import Scroll from 'react-scroll';
import { useDispatch, useSelector } from 'react-redux';
import BrainLeaderboard from '../../panels/Common/Leaderboard/BrainLeaderboard';

import './commonView.css';
import Shop from '../../panels/Common/Shop/Shop';
import ShopQuestion from '../../panels/Common/Shop/ShopQuestion';
import EffectDetailsSelector from '../../panels/Common/EffectDetails/EffectDetailsSelector';
import Main from '../../panels/Common/Main/Main';
import QuestionDetails from '../../panels/Common/QuestionDetails/QuestionDetails';
import globalVariables from '../../GlobalVariables';
import QuestionsList from '../../panels/Common/QuestionsList/QuestionsList';
import RejectedQuestion from '../../panels/Common/RejectedQuestion/RejectedQuestion';
import Homework from '../../panels/Common/Homework/Homework';

// const scroll = Scroll.animateScroll;

const CommonView = (props) => {
  const { id, nextView } = props;
  const [activeStory, setActiveStory] = useState(globalVariables.commonView.roots.main);
  const dispatch = useDispatch();
  const scheme = useSelector((state) => state.schemeChanger.scheme);

  // Main activity
  const [mainSelectedQuestion, setMainSelectedQuestion] = useState({});
  const [mainActivePanel, setMainActivePanel] = useState('Main');
  const [mainPopoutView, setMainPopoutView] = useState(true);
  const [mainHistory, setMainHistory] = useState(['Main']);

  useEffect(() => {
    if (mainActivePanel === 'Main') {
      setMainHistory(['Main']);
      bridge.send('VKWebAppDisableSwipeBack');
    } else if (mainActivePanel !== mainHistory[mainHistory.length - 1]) {
      setMainHistory(((prevState) => [...prevState, mainActivePanel]));
      bridge.send('VKWebAppEnableSwipeBack');
    }
  }, [mainActivePanel]);

  // Shop activity
  const [shopActivePanel, setShopActivePanel] = useState('Shop');
  const [questionData, setQuestionData] = useState({});
  const [popoutShopView, setPopoutShopView] = useState(true);
  const [shopHistory, setShopHistory] = useState(['Shop']);
  useEffect(() => {
    if (shopActivePanel === 'Shop') {
      setShopHistory(['Shop']);
      bridge.send('VKWebAppDisableSwipeBack');
    } else {
      setShopHistory(((prevState) => [...prevState, shopActivePanel]));
      bridge.send('VKWebAppEnableSwipeBack');
    }
  }, [shopActivePanel]);

  // Homework activity
  const [popoutHomeworkView, setPopoutHomeworkView] = useState(true);

  function changeStory(e) {
    dispatch({
      type: 'SCROLL_TO',
      payload: {
        scrollableElement: activeStory,
      },
    });
    if (e.currentTarget.dataset.story !== activeStory) {
      window.scroll({ top: 0, left: 0 });
    }

    setActiveStory(e.currentTarget.dataset.story);
  }

  const SwipeBack = (view) => {
    switch (view) {
      case 'MainView': {
        const historyTemp = mainHistory;
        historyTemp.pop();
        setMainActivePanel(historyTemp[historyTemp.length - 1]);
        break;
      }
      case 'ShopView': {
        const historyTemp = shopHistory;
        historyTemp.pop();
        setShopActivePanel(historyTemp[historyTemp.length - 1]);
        break;
      }
      default: break;
    }
  };

  return (
    <Epic
      className={(scheme === 'space_gray' && 'CommonView__Epic-dark')}
      id={id}
      activeStory={activeStory}
      tabbar={(
        <Tabbar>
          <TabbarItem
            onClick={changeStory}
            selected={activeStory === globalVariables.commonView.roots.main}
            data-story={globalVariables.commonView.roots.main}
          >
            <Icon28UserCircleOutline height={28} width={28} />
          </TabbarItem>
          <TabbarItem
            onClick={changeStory}
            selected={activeStory === globalVariables.commonView.roots.homework}
            data-story={globalVariables.commonView.roots.homework}
          >
            <Icon20EducationOutline height={28} width={28} />
          </TabbarItem>
          <TabbarItem
            onClick={changeStory}
            selected={activeStory === globalVariables.commonView.roots.shop}
            data-story={globalVariables.commonView.roots.shop}
          >
            <Icon28MarketOutline height={28} width={28} />
          </TabbarItem>
          <TabbarItem
            onClick={changeStory}
            selected={activeStory === globalVariables.commonView.roots.leaderboard}
            data-story={globalVariables.commonView.roots.leaderboard}
          >
            <Icon28ListOutline height={28} width={28} />
          </TabbarItem>
        </Tabbar>
      )}
    >
      <Root id={globalVariables.commonView.roots.main} activeView="MainView">
        <View
          activePanel={mainActivePanel}
          id="MainView"
          popout={(mainPopoutView && (<ScreenSpinner />))}
          onSwipeBack={() => SwipeBack('MainView')}
          history={mainHistory}
          modal={<EffectDetailsSelector />}
        >
          <Main
            id={globalVariables.commonView.panels.main}
            setActivePanel={setMainActivePanel}
            setSelectedQuestion={setMainSelectedQuestion}
            nextView={nextView}
            setActiveStory={setActiveStory}
            setPopoutMainView={setMainPopoutView}
            popoutMainView={mainPopoutView}
          />
          <QuestionsList
            id={globalVariables.commonView.panels.questionsList}
            setActivePanel={setMainActivePanel}
            setSelectedQuestion={setMainSelectedQuestion}
          />
          <RejectedQuestion
            id={globalVariables.commonView.panels.rejectedQuestion}
            setActivePanel={setMainActivePanel}
            selectedQuestion={mainSelectedQuestion}
            setActiveStory={setActiveStory}
          />
          <QuestionDetails
            id={globalVariables.commonView.panels.questionDetails}
            setActivePanel={setMainActivePanel}
            selectedQuestion={mainSelectedQuestion}
          />
        </View>
      </Root>
      <Root id={globalVariables.commonView.roots.homework} activeView="HomeworkView">
        <View
          activePanel="Homework"
          id="HomeworkView"
          popout={(popoutHomeworkView && (<ScreenSpinner />))}
        >
          <Homework
            id={globalVariables.commonView.panels.homework}
            setPopoutHomeworkView={setPopoutHomeworkView}
            nextView={nextView}
            setActiveStory={setActiveStory}
          />
        </View>
      </Root>
      <Root id={globalVariables.commonView.roots.shop} activeView="ShopView">
        <View
          className="ShopView"
          activePanel={shopActivePanel}
          id="ShopView"
          onSwipeBack={() => SwipeBack('ShopView')}
          history={shopHistory}
          popout={(popoutShopView && (<ScreenSpinner />))}
        >
          <Shop
            id={globalVariables.commonView.panels.shop}
            setActivePanel={setShopActivePanel}
            setQuestionData={setQuestionData}
            setPopoutShopView={setPopoutShopView}
            popoutShopView={popoutShopView}
            setActiveStory={setActiveStory}
            nextView={nextView}
          />
          <ShopQuestion
            id={globalVariables.commonView.panels.shopQuestion}
            questionData={questionData}
            setActivePanel={setShopActivePanel}
          />
        </View>
      </Root>
      <Root id={globalVariables.commonView.roots.leaderboard} activeView="LeaderboardView">
        <View activePanel="Leaderboard" id="LeaderboardView">
          <BrainLeaderboard
            id={globalVariables.commonView.panels.leaderboard}
            setActiveStory={setActiveStory}
          />
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
