import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './workView.less';
import { View } from '@vkontakte/vkui';
import WorkGallery from '../../panels/Work/WorkGallery/WorkGallery';
import QuizResult from '../../panels/QuizResult/QuizResult';
import WorkViewModal from "./WorkViewModal";

const WorkView = (props) => {
  const { id, nextView } = props;
  const [activePanel, setActivePanel] = useState('WorkGallery');
  return (
    <View id={id} activePanel={activePanel} className="WorkView" modal={<WorkViewModal nextView={nextView} />}>
      <WorkGallery id="WorkGallery" setActivePanel={setActivePanel} nextView={nextView} />
      <QuizResult id="QuizResultPanel" setActivePanel={setActivePanel} nextView={nextView} />
    </View>
  );
};

WorkView.propTypes = {
  id: PropTypes.string.isRequired,
  nextView: PropTypes.func.isRequired,
};
WorkView.defaultProps = {};
export default WorkView;
