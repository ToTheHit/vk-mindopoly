import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PopoutWrapper, ScreenSpinner, View } from '@vkontakte/vkui';
import Main from '../panels/Common/Main/Main';
import QuestionDetails from '../panels/Common/QuestionDetails/QuestionDetails';

const MainView = (props) => {
  const { id, nextView, setActiveStory } = props;
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [activePanel, setActivePanel] = useState('Main');
  const [popoutMainView, setPopoutMainView] = useState(true);

  useEffect(() => {
    setPopoutMainView(true);
  }, []);

  return (
    <View activePanel={activePanel} id={id} popout={(popoutMainView && (<ScreenSpinner />))}>
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
  );
};

MainView.propTypes = {
  id: PropTypes.string.isRequired,
  nextView: PropTypes.func.isRequired,
  setActiveStory: PropTypes.func.isRequired,
};
MainView.defaultProps = {};
export default MainView;
