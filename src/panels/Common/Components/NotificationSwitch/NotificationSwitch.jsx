import React, { useState, useEffect } from 'react';
import {
  Caption,
  Card,
  classNames,
  Div, Separator,
  SimpleCell,
  Switch,
  Text, Title,
  Tooltip,
} from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import { useDispatch, useSelector } from 'react-redux';
import './notificationSwitch.css';

const NotificationSwitch = (props) => {
  const { popoutMainView } = props;
  const dispatch = useDispatch();
  const notificationAllow = useSelector((state) => state.notificationsAllow.isAllow);
  const msToNextExam = useSelector((state) => state.userInfo.msToNextExam);
  const scheme = useSelector((state) => state.schemeChanger.scheme);

  const tooltipsStory2 = useSelector((state) => state.tooltip.story2);
  const [timeToTest, setTimeToTest] = useState({
    hour: 0,
    minute: 0,
  });

  function getCorrectWordHours(count) {
    const cases = [2, 0, 1, 1, 1, 2];
    return ['час', 'часа', 'часов'][(count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5]];
  }
  function getCorrectWordMinutes(count) {
    const cases = [2, 0, 1, 1, 1, 2];
    return ['минута', 'минуты', 'минут'][(count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5]];
  }

  useEffect(() => {
    let s = msToNextExam;
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const hrs = (s - mins) / 60;

    setTimeToTest({
      hour: hrs,
      minute: mins,
    });
  }, [msToNextExam]);

  function updateNotificationsStatus(status) {
    if (status) {
      bridge.send('VKWebAppAllowNotifications', {})
        .then(() => {
          dispatch({
            type: 'UPDATE_NOTIFICATIONS_ALLOW',
            payload: { isAllow: status },
          });
        })
        .catch(() => {
          dispatch({
            type: 'UPDATE_NOTIFICATIONS_ALLOW',
            payload: { isAllow: false },
          });
        });
    } else {
      bridge.send('VKWebAppDenyNotifications', {});
      dispatch({
        type: 'UPDATE_NOTIFICATIONS_ALLOW',
        payload: { isALlow: false },
      });
    }
  }

  function onCloseTooltipNotification() {
    dispatch({
      type: 'TOOLTIP_UPDATE_STORY2',
      payload: {
        notifications: false,
      },
    });
    dispatch({
      type: 'TOOLTIP_UPDATE',
      payload: {
        mainScreenComplete: true,
      },
    });
  }

  function getTime() {
    let hours = timeToTest.hour;
    let minutes = timeToTest.minute;
    minutes += 1;
    if (minutes === 60) {
      hours += 1;
      minutes = 0;
    }
    if (hours > 0) {
      if (minutes > 0) {
        return `${hours} ${getCorrectWordHours(hours)} ${minutes} ${getCorrectWordMinutes(minutes)}`;
      }
      return `${hours} ${getCorrectWordHours(hours)}`;
    }
    if (minutes > 1) return `${minutes} ${getCorrectWordMinutes(minutes)}`;
    return 'Меньше минуты';
  }
  return (
    <Div className="NotificationSwitch" style={{ paddingTop: 0 }}>
      <Card
        className={classNames('NotificationSwitch__card', { 'NotificationSwitch__card-dark': scheme === 'space_gray' })}
      >
        <div className="NotificationSwitch__date">
          <Caption level="1" weight="regular" className="NotificationSwitch__date--title">
            До следующего отчёта
          </Caption>
          <Title level="3" weight="regular" className="NotificationSwitch__date--time">
            {getTime()}
          </Title>
        </div>
        <Separator wide />
        <Tooltip
          text="Мозгополия может напоминать о ежедневных Мозговых отчётах через уведомления."
          offsetX={50}
          cornerOffset={90}
          isShown={tooltipsStory2.notifications && !popoutMainView}
          onClose={onCloseTooltipNotification}
        >
          <SimpleCell
            disabled
            before={(
              <Icon28Notifications
                height={24}
                width={24}
                style={{
                  padding: '10px 10px 10px 12px',
                  color: 'var(--button_secondary_foreground)',
                }}
              />
            )}
            after={(
              <Switch
                checked={notificationAllow}
                onChange={(e) => {
                  updateNotificationsStatus(e.target.checked);
                }}
              />
            )}
          >
            <Text weight="regular">
              Напоминать об отчётах
            </Text>
          </SimpleCell>
        </Tooltip>

      </Card>
    </Div>
  );
};

NotificationSwitch.propTypes = {
  popoutMainView: PropTypes.bool.isRequired,
};
NotificationSwitch.defaultProps = {};
export default NotificationSwitch;
