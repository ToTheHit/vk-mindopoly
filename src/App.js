import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Root, View } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';

import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import StartView from './panels/StartView/StartView';

const App = () => {
  const [activePanel, setActivePanel] = useState('start1');
  const [activeView, setActiveView] = useState('view1');
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
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


  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <Root activeView={activeView}>
      <View id="view1" activePanel={activePanel} popout={popout} header={false} style={{ position: 'fixed', top: '-2px' }}>
        {/* <Home id='home' fetchedUser={fetchedUser} go={go} /> */}
        {/* <Persik id='persik' go={go} /> */}
        <StartView id="start1" go={go} />
      </View>
    </Root>

  );
};

export default App;
