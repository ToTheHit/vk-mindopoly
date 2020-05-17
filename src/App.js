import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { ConfigProvider, Root } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import './app.css';

import '@vkontakte/vkui/dist/vkui.css';
import StartView from './views/StartView/StartView';
import CommonView from './views/CommonView/CommonView';
import TestView from './views/TestView/TestView';
import globalVariables from './GlobalVariables';
import WorkView from './views/WorkView/WorkView';

const App = () => {
  const [activeView, setActiveView] = useState(globalVariables.view.start);
  const dispatch = useDispatch();
  const scheme = useSelector((state) => state.schemeChanger.scheme);

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      switch (type) {
        case 'VKWebAppUpdateConfig': {
          const schemeAttribute = document.createAttribute('scheme');
          schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
          document.body.attributes.setNamedItem(schemeAttribute);
          dispatch({
            type: 'UPDATE_SCHEME',
            payload: schemeAttribute.value,
          });
          break;
        }
        case 'VKWebAppAllowNotificationsResult':
          dispatch({
            type: 'UPDATE_USER_INFO',
            payload: { notificationsAllow: true },
          });
          break;
        case 'VKWebAppDenyNotificationsResult':
          dispatch({
            type: 'UPDATE_USER_INFO',
            payload: { notificationsAllow: false },
          });
          break;
        case 'VKWebAppAllowNotificationsFailed':
          console.info('Notificatiom rejected');
          break;
        default:
          // console.info('UknownType:', type);
          break;
      }
    });

    const urlParams = new URLSearchParams(window.location.search);
    dispatch({
      type: 'UPDATE_USER_INFO',
      payload: { notificationsAllow: (urlParams.get('vk_are_notifications_enabled') === '1') },
    });
  }, []);

  return (
    <ConfigProvider
      webviewType="vkapps"
      scheme={(((scheme === 'light' || scheme === 'bright_light') || scheme === 'client_light') ? 'bright_light' : 'space_gray')}
    >
      <Root activeView={activeView}>
        <StartView id={globalVariables.view.start} nextView={setActiveView} />
        <CommonView id={globalVariables.view.main} nextView={setActiveView} />
        <WorkView id={globalVariables.view.work} nextView={setActiveView} />

        <TestView id={globalVariables.view.test} />
      </Root>
    </ConfigProvider>

  );
};

export default App;
