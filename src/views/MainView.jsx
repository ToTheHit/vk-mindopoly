import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';
import Main from '../panels/Common/Main/Main';
import QuestionDetails from '../panels/Common/QuestionDetails/QuestionDetails';

const MainView = (props) => {
  const { id, setActivePanel } = props;
  const {selectedQuestion, setSelectedQuestion} = useState({});
  return (
    <View activePanel="Main" id={id}>
      <Main id="Main" setActivePanel={setActivePanel} setSelectedQuestion={setSelectedQuestion} />
      <QuestionDetails id="QuestionDetails" setActivePanel={setActivePanel} selectedQuestion={selectedQuestion} />
    </View>
  );
};

MainView.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
};
MainView.defaultProps = {};
export default MainView;
