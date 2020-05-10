import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './testView.css';
import {
  Div, Panel, PanelHeader, Separator, View,
} from '@vkontakte/vkui';

import bridge from '@vkontakte/vk-bridge';

const TestView = (props) => {
  const { id } = props;
  const [result, setResult] = useState({});
  const [error, setError] = useState({});
  const { VK } = window;

  useEffect(() => {
    /*    bridge.send('VKWebAppAllowNotifications', {})
      .then(data => setResult(data))
      .catch(err => setError(err)); */

    /*    axios.post('https://81542c99.ngrok.io/api/registerUser', {}, {
      params: {
        vk_access_token_settings: urlParams.get('vk_access_token_settings'),
        vk_app_id: urlParams.get('vk_app_id'),
        vk_are_notifications_enabled: urlParams.get('vk_are_notifications_enabled'),
        vk_is_app_user: urlParams.get('vk_is_app_user'),
        vk_is_favorite: urlParams.get('vk_is_favorite'),
        vk_language: urlParams.get('vk_language'),
        vk_platform: urlParams.get('vk_platform'),
        vk_ref: urlParams.get('vk_ref'),
        vk_user_id: urlParams.get('vk_user_id'),
        sign: urlParams.get('sign'),
      },
    })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []); */

    /*    axios.get(`https://81542c99.ngrok.io/api/registerUser${window.location.search}`)
      .then((data) => {
        console.info(data);
        bridge.send('VKWebAppStorageSet', { key: 'authToken', value: data.data.attachment.token });
      })
      .catch((err) => console.info(err)); */

    /*    bridge.send('VKWebAppStorageGet', { keys: ['authToken'] })
      .then(((data) => {
        const urlParams = new URLSearchParams(window.location.search);
        setTimeout(() => {
          console.info({
            token: data.keys[0].value,
            id: urlParams.get('vk_user_id'),
          });
        }, 1000);

        axios.get('https://81542c99.ngrok.io/api/getTest', {
          params: {
            token: data.keys[0].value,
            id: urlParams.get('vk_user_id'),
          }
        })
          .then((data1) => console.info(data1))
          .catch((err) => console.info(err));

      })); */

    // bridge.send("VKWebAppStorageSet", {"key": globalVariables.authToken, "value": '12321321'});
    /*
    bridge.send('VKWebAppStorageGet', { keys: [globalVariables.authToken] })
      .then(((data) => {
        setTimeout(() => {
          console.info(data);

        }, 1000)

      })); */

    // bridge.send('VKWebAppShare', { link: 'https://vk.com/app7441788' });

    /*    bridge.send('VKWebAppGetAuthToken', { app_id: 7441788, scope: 'friends' })
      .then((data) => {
        console.info(data.access_token);
        const urlParams = new URLSearchParams(window.location.search);

        axios.get(`${globalVariables.serverURL}/api/leaderBoard?id=${urlParams.get('vk_user_id')}&userToken=${data.access_token}`)
          .then((srvData) => {
            console.info(srvData);
          })
          .catch((err) => console.info(err));
      }); */

    const urlParams = new URLSearchParams(window.location.search);


    bridge.send('VKWebAppCallAPIMethod', {
      method: 'users.get',
      params: {
        user_ids: '1',
        v: '5.103',
        access_token: 'token',
      },
    })
      .then((data) => {
        setTimeout(() => {
          console.info(data);
        }, 1000);
      })
      .catch((err) => {
        setTimeout(() => {
          console.info(err);
        }, 1000);
      });
  }, []);

  return (
    <View id={id} activePanel="1" className="TestView">
      <Panel id="1">
        <PanelHeader>
          Development View
        </PanelHeader>
        <Div>

          <div>
            <TestViewChild testFunc={() => {}} testFunc1={() => {}} />
          </div>
          {JSON.stringify(result)}

          <Separator />
          <Separator />
          <Separator />
          <Separator />
          <Separator />
          <Separator />
          {JSON.stringify(error)}

          {/* {window.location.href} */}

        </Div>
      </Panel>
    </View>
  );
};

TestView.propTypes = {
  id: PropTypes.string.isRequired,
};
TestView.defaultProps = {};
export default TestView;


const TestViewChild = (props) => {
  const { testFunc, testFunc1 } = props;

  useEffect(() => {
    console.log(1);
  }, [testFunc, testFunc1]);
  return (
    <div>
      12321
    </div>
  );
};

TestViewChild.propTypes = {
  testFunc: PropTypes.func.isRequired,
  testFunc1: PropTypes.func.isRequired,
};
