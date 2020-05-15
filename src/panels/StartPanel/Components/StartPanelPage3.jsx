import React from 'react';
import PropTypes from 'prop-types';
import { classNames, Panel, Text, } from '@vkontakte/vkui';
import image from '../../../assets/StartPanel/images/opt_cherry-fail.png';

const StartPanelPage3 = (props) => {
  const { id } = props;

  return (
    <Panel
      id={id}
      className={classNames('StartPanel', { StartPanel_dark: document.body.getAttribute('scheme') !== 'bright_light' })}
    >
      <div className="StartPanel--content">
        <img src={image} alt="Девушка с лупой" className="StartPanel--image" />
        <Text weight="regular" className="StartPanel--text">
          Добавляйте свои вопросы и зарабатывайте на чужих ошибках.
        </Text>
      </div>

    </Panel>
  );
};

StartPanelPage3.propTypes = {
  id: PropTypes.string.isRequired,
};
StartPanelPage3.defaultProps = {};
export default StartPanelPage3;
