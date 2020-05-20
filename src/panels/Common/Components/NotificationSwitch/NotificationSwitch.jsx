import React from 'react';
import { Card, classNames, Div, SimpleCell, Switch, Text, Tooltip, } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import { useDispatch, useSelector } from 'react-redux';
import './notificationSwitch.css';

const NotificationSwitch = () => {
  const dispatch = useDispatch();
  const notificationAllow = useSelector((state) => state.notificationsAllow.isAllow);
  const scheme = useSelector((state) => state.schemeChanger.scheme);
  const tooltipsStory2 = useSelector((state) => state.tooltip.story2);

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

  return (
    <Div className="NotificationSwitch" style={{ paddingTop: 0 }}>
      <Card
        className={classNames('NotificationSwitch__card', { 'NotificationSwitch__card-dark': scheme === 'space_gray' })}
      >
        <Tooltip
          text="Мозгополия может напоминать о ежедневных Мозговых отчётах через уведомления."
          offsetX={50}
          cornerOffset={90}
          isShown={tooltipsStory2.notifications}
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

NotificationSwitch.propTypes = {};
NotificationSwitch.defaultProps = {};
export default NotificationSwitch;
