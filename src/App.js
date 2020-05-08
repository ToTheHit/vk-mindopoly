import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Root } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import './app.css';
// import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import StartView from './views/StartView';
import CommonView from './views/CommonView';
import TestView from './views/TestView';
import globalVariables from './GlobalVariables';
import Page404 from './views/Page404';

const App = () => {
  const [activeView, setActiveView] = useState(globalVariables.view.main);
  const dispatch = useDispatch();

  useEffect(() => {

/*    bridge.send('VKWebAppUpdateConfig', {})
      .then((data) => {
        setTimeout(() => {
          console.info(data);
        }, 1000);
      })
      .catch((err) => {
        setTimeout(() => {
          console.info(err);
        }, 1000);
      });*/

    bridge.subscribe(({ detail: { type, data } }) => {
      switch (type) {
        case 'VKWebAppUpdateConfig':
          const schemeAttribute = document.createAttribute('scheme');
          schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
          document.body.attributes.setNamedItem(schemeAttribute);
          dispatch({
            type: 'UPDATE_SCHEME',
            payload: schemeAttribute.value,
          });
          break;
        case 'VKWebAppAllowNotificationsResult':
          console.info('Notification accepted!');
          break;
        case 'VKWebAppDenyNotificationsResult':
          console.info('Notification deny');
          break;
        case 'VKWebAppAllowNotificationsFailed':
          console.info('Why you hate me?');
          break;
        default:
          // console.info('UknownType:', type);
          break;
      }
    });
  }, []);

  return (
    <Root activeView={activeView}>
      <StartView id={globalVariables.view.start} nextView={setActiveView} />
      <CommonView id={globalVariables.view.main} />
      <TestView id={globalVariables.view.test} />
      <Page404 id={globalVariables.view.page404} nextView={setActiveView} />
    </Root>

  );
};

export default App;
