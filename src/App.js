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

  function UpdateTheme() {
    // console.info(scheme);
    if (scheme === 'bright_light' || scheme === 'client_light') {
      bridge.send('VKWebAppSetViewSettings', { status_bar_style: 'dark', action_bar_color: '#fff' })
        .catch((err) => console.info(err));
    } else if (scheme === 'space_gray' || scheme === 'client_dark') {
      bridge.send('VKWebAppSetViewSettings', { status_bar_style: 'light', action_bar_color: '#000' })
        .catch((err) => console.info(err));
    }
  }

  /*  useEffect(() => {
    UpdateTheme();
  }, [scheme]); */

  const [test, setTest] = useState('light');

  // useEffect(() => console.info(test), [test])
  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      switch (type) {
        case 'VKWebAppUpdateConfig': {
          const schemeAttribute = document.createAttribute('scheme');
          schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
          document.body.attributes.setNamedItem(schemeAttribute);
          setTest((data.appearance === 'light' ? 'dark' : 'light'));

          // console.info('New scheme:', data.scheme);

/*          if (data.scheme === 'bright_light' || data.scheme === 'client_light') {
            bridge.send('VKWebAppSetViewSettings', { status_bar_style: 'dark', action_bar_color: '#fff' })
              .catch((err) => console.info(err));
          } else if (data.scheme === 'space_gray' || data.scheme === 'client_dark') {
            bridge.send('VKWebAppSetViewSettings', { status_bar_style: 'light', action_bar_color: '#000' })
              .catch((err) => console.info(err));
          }*/


          dispatch({
            type: 'UPDATE_SCHEME',
            payload: schemeAttribute.value,
          });
          break;
        }
        case 'VKWebAppAllowNotificationsResult':
          dispatch({
            type: 'UPDATE_NOTIFICATIONS_ALLOW',
            payload: { isAllow: true },
          });
          break;
        case 'VKWebAppDenyNotificationsResult':
          dispatch({
            type: 'UPDATE_NOTIFICATIONS_ALLOW',
            payload: { isAllow: false },
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
      type: 'UPDATE_NOTIFICATIONS_ALLOW',
      payload: { isAllow: (urlParams.get('vk_are_notifications_enabled') === '1') },
    });
  }, []);

  return (
    <ConfigProvider
      webviewType="vkapps"
      scheme={(((scheme === 'light' || scheme === 'bright_light') || scheme === 'client_light') ? 'bright_light' : 'space_gray')}
      appearance={test}
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
