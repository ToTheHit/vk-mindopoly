import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Text, } from '@vkontakte/vkui';

import image from '../../../assets/StartPanel/images/opt_cherry-check.png';

const StartPanelPage2 = (props) => {
  const { id } = props;

  return (
    <Panel id={id} className="StartPanel">
      <div className="StartPanel--content">
        <img src={image} alt="Девушка с лупой" className="StartPanel--image" />
        <Text weight="regular" className="StartPanel--text">
          Зарабатывайте Очки Гения и Монеты, отвечая на вопросы других игроков.
        </Text>
      </div>
    </Panel>
  );
};

StartPanelPage2.propTypes = {
  id: PropTypes.string.isRequired,
};
StartPanelPage2.defaultProps = {};
export default StartPanelPage2;
