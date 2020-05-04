import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Root, View } from '@vkontakte/vkui';
import Common from '../panels/Common/Common';
import Work from '../panels/Work/Work';
import QuizResult from '../panels/QuizResult/QuizResult';
import WorkGallery from '../panels/Work/WorkGallery/WorkGallery';

const CommonView = (props) => {
  const { id } = props;
  const [activePanel, setActivePanel] = useState('QuizResultPanel');
  const [popout, setPopout] = useState(/* <ScreenSpinner size="large" /> */);

  return (
    <View
      id={id}
      activePanel={activePanel}
      popout={popout}
      header
    >
      <Common id="CommonPanel" setActivePanel={setActivePanel} />
      {/*<Work id="WorkPanel" setActivePanel={setActivePanel} />*/}
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
