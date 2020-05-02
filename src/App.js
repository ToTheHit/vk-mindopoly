import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Root, } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import './app.css';
// import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import StartView from './views/StartView';
import CommonView from './views/CommonView';
import TestView from './views/TestView';

const App = () => {
  const [activeView, setActiveView] = useState('StartView');

  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(/* <ScreenSpinner size="large" /> */);
  const dispatch = useDispatch();

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
        document.body.attributes.setNamedItem(schemeAttribute);
        dispatch({
          type: 'UPDATE_SCHEME',
          payload: schemeAttribute.value,
        });
      }
      if (type === 'VKWebAppAllowNotificationsResult') {
        console.log('Notification accepted!');
        setActiveView('CommonView');
      }
      if (type === 'VKWebAppAllowNotificationsFailed') {
        console.log('Why you hate me?');
      }
    });

    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }

    fetchData();
  }, []);

  return (
    <Root activeView={activeView}>
      <StartView id="StartView" />
      <CommonView id="CommonView" />
      <TestView id="test" />
    </Root>

  );
};

export default App;
