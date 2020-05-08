import React from 'react';
import PropTypes from 'prop-types';
import './questionDetails.css';
import {
  IOS, Panel, PanelHeader, PanelHeaderBack, platform,
} from '@vkontakte/vkui';

const QuestionDetails = (props) => {
  const { id, setActivePanel } = props;
  return (
    <Panel id={id} className="QuestionDetails">
      <PanelHeader
        left={(
          <PanelHeaderBack
            label={(platform === IOS && 'Назад')}
            onClick={() => setActivePanel('Shop')}
          />
        )}
      >
        Вопрос
      </PanelHeader>
    </Panel>
  );
};

QuestionDetails.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
};
QuestionDetails.defaultProps = {};
export default QuestionDetails;
