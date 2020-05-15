import React from 'react';
import PropTypes from 'prop-types';
import {
  classNames, Panel, Text, Title,
} from '@vkontakte/vkui';

import image from '../../../assets/StartPanel/images/opt_cherry-searching-1.png';

const StartPanelPage1 = (props) => {
  const { id, readyToShow } = props;

  return (
    <Panel id={id} className="StartPanel">
      <div className={classNames('StartPanel--content', { 'StartPanel--content-hidden': !readyToShow })} style={{ marginTop: '-32px' }}>
        <img src={image} alt="Девушка с лупой" className="StartPanel--image" />
        <Title level="1" weight="heavy" className="StartPanel--title">
          Мозгополия
        </Title>
        <Text weight="regular" className="StartPanel--text">
          Добро пожаловать в Мозгополию, образовательную мини-игру.
        </Text>

      </div>
    </Panel>
  );
};

StartPanelPage1.propTypes = {
  id: PropTypes.string.isRequired,
  readyToShow: PropTypes.bool.isRequired,
};
StartPanelPage1.defaultProps = {};
export default StartPanelPage1;
