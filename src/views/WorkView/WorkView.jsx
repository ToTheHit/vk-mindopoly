import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './workView.less';
import { PopoutWrapper, ScreenSpinner, View } from '@vkontakte/vkui';
import WorkGallery from '../../panels/Work/WorkGallery/WorkGallery';
import QuizResult from '../../panels/QuizResult/QuizResult';
import WorkViewModal from './WorkViewModal';

const WorkView = (props) => {
  const popout = (
    <ScreenSpinner />
  );

  const popoutShadow = (
    <PopoutWrapper alignY="center" alignX="center">
      <ScreenSpinner />
    </PopoutWrapper>
  );

  const { id, nextView } = props;
  const [activePanel, setActivePanel] = useState('WorkGallery');
  const [popoutIsActive, setPopoutIsActive] = useState(true);
  const [popoutShadowIsActive, setPopoutShadowIsActive] = useState(false);
  const [isPreviousQuiz, setIsPreviousQuiz] = useState(false);

  return (
    <View
      id={id}
      activePanel={activePanel}
      className="WorkView"
      modal={(
        <WorkViewModal
          nextView={nextView}
          setPopoutIsActive={setPopoutIsActive}
          isPreviousQuiz={isPreviousQuiz}
        />
      )}
      popout={(popoutIsActive ? popout : (popoutShadowIsActive && popoutShadow))}
    >
      <WorkGallery
        id="WorkGallery"
        setActivePanel={setActivePanel}
        nextView={nextView}
        setIsPreviousQuiz={setIsPreviousQuiz}
      />
      <QuizResult
        id="QuizResultPanel"
        setActivePanel={setActivePanel}
        nextView={nextView}
        setPopoutShadowIsActive={setPopoutShadowIsActive}
      />
    </View>
  );
};

WorkView.propTypes = {
  id: PropTypes.string.isRequired,
  nextView: PropTypes.func.isRequired,
};
WorkView.defaultProps = {};
export default WorkView;
