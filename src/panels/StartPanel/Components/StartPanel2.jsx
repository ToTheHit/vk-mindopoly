import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  Panel, Button, Title, Text, classNames,
} from '@vkontakte/vkui';
import PropTypes from 'prop-types';

const StartPanel2 = (props) => {
  const { id } = props;
  const [time, setTime] = useState('20:00');
  return (
    <Panel id={id} className={classNames('StartPanel', { StartPanel_dark: document.body.getAttribute('scheme') !== 'bright_light' })}>
      <div className="StartPanel--content">
        <Title level="1" weight="bold" className="StartPanel--title">Уведомления</Title>
        <Text className="StartPanel--text">
          Мы будем напоминать Вам о новых
          самостоялках. Выберите удобное время и
          включите уведомления.
        </Text>
        <div className="StartPanel--time">
          <Text weight="regular" className="StartPanel--time_counter">
            {time.split(':')[0]}
          </Text>
          <Text weight="regular" className="StartPanel--time_colon">:</Text>
          <Text weight="regular" className="StartPanel--time_counter">
            {time.split(':')[1]}
          </Text>
          <input
            type="time"
            min="00:00"
            max="24:00"
            step="5"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <Button
          size="l"
          mode="tertiary"
          onClick={() => {
            bridge.send('VKWebAppAllowNotifications', {});
          }}
        >
          Разрешить уведомления
        </Button>
      </div>

    </Panel>
  );
};

StartPanel2.propTypes = {
  id: PropTypes.string.isRequired,
};

export default StartPanel2;
