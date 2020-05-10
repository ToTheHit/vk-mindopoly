import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScreenSpinner, View, ConfigProvider } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import Main from '../panels/Common/Main/Main';
import QuestionDetails from '../panels/Common/QuestionDetails/QuestionDetails';


const MainView = (props) => {
  const { id, nextView, setActiveStory } = props;
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [activePanel, setActivePanel] = useState('Main');
  const [popoutMainView, setPopoutMainView] = useState(true);
  const [history, setHistory] = useState(['Main']);

  useEffect(() => {
    setPopoutMainView(true);
  }, []);

  useEffect(() => {
    if (activePanel === 'Main') {
      setHistory(['Main']);
      bridge.send('VKWebAppDisableSwipeBack')
        .then((data) => console.info(data))
        .catch((err) => console.info(err));
    } else {
      setHistory(((prevState) => [...prevState, activePanel]));
      bridge.send('VKWebAppEnableSwipeBack')
        .then((data) => console.info(data))
        .catch((err) => console.info(err));
    }
  }, [activePanel]);


  const goBack = () => {
    const historyTemp = history;
    historyTemp.pop();
    setActivePanel(historyTemp[historyTemp.length - 1]);
  };

  return (
    <ConfigProvider>
      <View
        activePanel={activePanel}
        id={id}
        popout={(popoutMainView && (<ScreenSpinner />))}
        onSwipeBack={goBack}
        history={history}
      >
        <Main
          id="Main"
          setActivePanel={setActivePanel}
          setSelectedQuestion={setSelectedQuestion}
          nextView={nextView}
          setActiveStory={setActiveStory}
          setPopoutMainView={setPopoutMainView}
          popoutMainView={popoutMainView}
        />
        <QuestionDetails
          id="QuestionDetails"
          setActivePanel={setActivePanel}
          selectedQuestion={selectedQuestion}
        />
      </View>
    </ConfigProvider>
  );
};

MainView.propTypes = {
  id: PropTypes.string.isRequired,
  nextView: PropTypes.func.isRequired,
  setActiveStory: PropTypes.func.isRequired,
};
MainView.defaultProps = {};
export default MainView;
