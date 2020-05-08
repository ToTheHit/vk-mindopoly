import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';
import Common from '../panels/Common/Common';
import QuizResult from '../panels/QuizResult/QuizResult';
import WorkGallery from '../panels/Work/WorkGallery/WorkGallery';

const CommonView = (props) => {
  const { id } = props;
  const [activePanel, setActivePanel] = useState('CommonPanel');
  const [popout, setPopout] = useState(/* <ScreenSpinner size="large" /> */);

  return (
    <View
      id={id}
      activePanel={activePanel}
      popout={popout}
      header
    >
      <Common id="CommonPanel" setActivePanel={setActivePanel} />
      <WorkGallery id="WorkPanel" setActivePanel={setActivePanel} />
      <QuizResult id="QuizResultPanel" setActivePanel={setActivePanel} />
    </View>
  );
};

CommonView.propTypes = {
  id: PropTypes.string.isRequired,
};
CommonView.defaultProps = {};
export default CommonView;
