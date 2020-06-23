import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import './notifications.css';
import {
  Group, Header, Placeholder, SimpleCell, Subhead,
} from '@vkontakte/vkui';
import { useSelector } from 'react-redux';
import globalVariables from '../../../../../GlobalVariables';

const Notifications = (props) => {
  const { notifications, setActivePanel, setSelectedQuestion } = props;
  const allQuestions = useSelector((state) => state.userQuestions.questions.All);
  const notifications1 = useSelector((state) => state.userInfo.notifications);

  function getIcon(type, code) {
    if (type === globalVariables.notificationType.QuestionResult) {
      if (code === 0) {
        return (
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Notification" transform="translate(-12.000000, -12.000000)">
                <g id="icn48_bubble_plus" transform="translate(12.000000, 12.000000)">
                  <path
                    d="M11.0882145,0 L20.9117855,0 C29.8772054,0 32,2.12279464 32,11.0882145 L32,20.9117855 C32,29.8772054 29.8772054,32 20.9117855,32 L11.0882145,32 C2.12279464,32 0,29.8772054 0,20.9117855 L0,11.0882145 C0,2.12279464 2.12279464,0 11.0882145,0"
                    id="Body"
                    fill="#EBEDF0"
                    fillRule="evenodd"
                  />
                  <path
                    d="M11.8717448,25.5110677 C12.2949219,25.5110677 12.5826823,25.2910156 13.0904948,24.8339844 L16.0188802,22.2356771 L21.4440104,22.2356771 C23.9661458,22.2356771 25.3203125,20.8391927 25.3203125,18.359375 L25.3203125,11.8763021 C25.3203125,9.39648438 23.9661458,8 21.4440104,8 L10.5429688,8 C8.02929688,8 6.66666667,9.38802083 6.66666667,11.8763021 L6.66666667,18.359375 C6.66666667,20.8476562 8.02929688,22.2356771 10.5429688,22.2356771 L10.9492188,22.2356771 L10.9492188,24.4361979 C10.9492188,25.0878906 11.2877604,25.5110677 11.8717448,25.5110677 Z M12.21875,23.9622396 L12.21875,21.6009115 C12.21875,21.1438802 11.9479167,20.8730469 11.499349,20.8730469 L10.5514323,20.8730469 C8.83333333,20.8730469 8.02929688,20.0013021 8.02929688,18.3509115 L8.02929688,11.8763021 C8.02929688,10.2259115 8.83333333,9.36263021 10.5514323,9.36263021 L21.4440104,9.36263021 C23.1536458,9.36263021 23.9576823,10.2259115 23.9576823,11.8763021 L23.9576823,18.3509115 C23.9576823,20.0013021 23.1536458,20.8730469 21.4440104,20.8730469 L15.9596354,20.8730469 C15.4941406,20.8730469 15.2486979,20.9407552 14.9270833,21.2708333 L12.21875,23.9622396 Z M16.0442708,19.264974 C16.5013021,19.264974 16.7721354,18.9518229 16.7721354,18.452474 L16.7721354,15.9980469 L19.3365885,15.9980469 C19.8105469,15.9980469 20.1490885,15.7526042 20.1490885,15.2955729 C20.1490885,14.8300781 19.8359375,14.5761719 19.3365885,14.5761719 L16.7721354,14.5761719 L16.7721354,11.9609375 C16.7721354,11.4615885 16.5013021,11.1484375 16.0442708,11.1484375 C15.5872396,11.1484375 15.3417969,11.4785156 15.3417969,11.9609375 L15.3417969,14.5761719 L12.7773438,14.5761719 C12.2864583,14.5761719 11.9648438,14.8300781 11.9648438,15.2955729 C11.9648438,15.7526042 12.3033854,15.9980469 12.7773438,15.9980469 L15.3417969,15.9980469 L15.3417969,18.452474 C15.3417969,18.9348958 15.5872396,19.264974 16.0442708,19.264974 Z"
                    id="bubble"
                    fill="#3F8AE0"
                    fillRule="nonzero"
                  />
                </g>
              </g>
            </g>
          </svg>
        );
      }

      return (
        <svg
          width="32px"
          height="32px"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Notification" transform="translate(-12.000000, -12.000000)">
              <g id="icn48_bubble_minus" transform="translate(12.000000, 12.000000)">
                <path
                  d="M11.0882145,0 L20.9117855,0 C29.8772054,0 32,2.12279464 32,11.0882145 L32,20.9117855 C32,29.8772054 29.8772054,32 20.9117855,32 L11.0882145,32 C2.12279464,32 0,29.8772054 0,20.9117855 L0,11.0882145 C0,2.12279464 2.12279464,0 11.0882145,0"
                  id="Body"
                  fill="#EBEDF0"
                  fillRule="evenodd"
                />
                <path
                  d="M11.8717448,25.5110677 C12.2949219,25.5110677 12.5826823,25.2910156 13.0904948,24.8339844 L16.0188802,22.2356771 L21.4440104,22.2356771 C23.9661458,22.2356771 25.3203125,20.8391927 25.3203125,18.359375 L25.3203125,11.8763021 C25.3203125,9.39648438 23.9661458,8 21.4440104,8 L10.5429688,8 C8.02929688,8 6.66666667,9.38802083 6.66666667,11.8763021 L6.66666667,18.359375 C6.66666667,20.8476562 8.02929688,22.2356771 10.5429688,22.2356771 L10.9492188,22.2356771 L10.9492188,24.4361979 C10.9492188,25.0878906 11.2877604,25.5110677 11.8717448,25.5110677 Z M12.21875,23.9622396 L12.21875,21.6009115 C12.21875,21.1438802 11.9479167,20.8730469 11.499349,20.8730469 L10.5514323,20.8730469 C8.83333333,20.8730469 8.02929688,20.0013021 8.02929688,18.3509115 L8.02929688,11.8763021 C8.02929688,10.2259115 8.83333333,9.36263021 10.5514323,9.36263021 L21.4440104,9.36263021 C23.1536458,9.36263021 23.9576823,10.2259115 23.9576823,11.8763021 L23.9576823,18.3509115 C23.9576823,20.0013021 23.1536458,20.8730469 21.4440104,20.8730469 L15.9596354,20.8730469 C15.4941406,20.8730469 15.2486979,20.9407552 14.9270833,21.2708333 L12.21875,23.9622396 Z M16.7721354,15.9980469 L19.3365885,15.9980469 C19.8105469,15.9980469 20.1490885,15.7526042 20.1490885,15.2955729 C20.1490885,14.8300781 19.8359375,14.5761719 19.3365885,14.5761719 L16.7721354,14.5761719 L15.3417969,14.5761719 L12.7773438,14.5761719 C12.2864583,14.5761719 11.9648438,14.8300781 11.9648438,15.2955729 C11.9648438,15.7526042 12.3033854,15.9980469 12.7773438,15.9980469 L15.3417969,15.9980469 L16.7721354,15.9980469 Z"
                  id="bubble"
                  fill="#EB4250"
                  fillRule="nonzero"
                />
              </g>
            </g>
          </g>
        </svg>
      );
    } if (type === globalVariables.notificationType.Achievement) {

    }
    return null;
  }

  function getReason(item) {
    if (item.type === globalVariables.notificationType.QuestionResult) {
      if (item.notificationObject.code === 0) return item.notificationObject.text;
      return `${item.notificationObject.text} [${globalVariables.getReasonByCode(item.notificationObject.code)}]`;
    } if (item.type === globalVariables.notificationType.Achievement) {

    }
    return null;
  }

  function getRedirect(item) {
    if (item.type === globalVariables.notificationType.QuestionResult) {
      if (item.notificationObject.code === 0) {
        const questionTemp = allQuestions.find((question) => question._id === item.notificationObject.questionID);
        setSelectedQuestion(questionTemp);
        setActivePanel(globalVariables.commonView.panels.questionDetails);
      } else {
        setSelectedQuestion(item);
        setActivePanel(globalVariables.commonView.panels.rejectedQuestion);
      }
    } else if (item.type === globalVariables.notificationType.Achievement) {

    }
    return null;
  }

  function getTitle(type, code) {
    if (type === globalVariables.notificationType.QuestionResult) {
      if (code === 0) return 'Вопрос одобрен';
      return 'Вопрос отклонён';
    } if (type === globalVariables.notificationType.Achievement) {

    }
    return null;
  }

  const renderedNotifications = useMemo(() => {
    if (notifications1.length > 0) {
      return notifications1.map((item) => {
        if (item.category === 'All') return null;
        return (
          <SimpleCell
            className="Notifications__categoryRow"
            key={`Notification_${item.id}`}
            expandable
            multiline
            before={(
              <div
                className="Notifications__icon"
              >
                {getIcon(item.type, item.notificationObject.code)}
              </div>
            )}
            indicator={item.length}
            description={(
              <div className="Notifications__description">
                {getReason(item)}
              </div>
            )}
            onClick={() => {
              getRedirect(item);
            }}
          >
            <Subhead weight="regular" className="Notifications__title">
              {getTitle(item.type, item.notificationObject.code)}
            </Subhead>
          </SimpleCell>
        );
      });
    }
    return (
      <Placeholder>
        У Вас пока что нет уведомлений.
      </Placeholder>
    );
  }, [JSON.stringify(notifications), notifications.length, allQuestions]);

  return (
    <Group
      className="Notifications"
      separator="hide"
      header={(
        <Header className="Notifications__header">
          Уведомления
        </Header>
      )}
    >
      {renderedNotifications}
    </Group>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    notificationObject: PropTypes.shape({
      code: PropTypes.number,
      text: PropTypes.string,
      reason: PropTypes.string,
      questionID: PropTypes.string,
    }),
  })).isRequired,
  setActivePanel: PropTypes.func.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
};
Notifications.defaultProps = {};
export default Notifications;
