import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Panel, ScreenSpinner, View,
} from '@vkontakte/vkui';

import './page404.css';
import bridge from '@vkontakte/vk-bridge';
import axios from 'axios';
import globalVariables from '../GlobalVariables';

const Page404 = (props) => {
  const { id, nextView } = props;
  const [showScreen, setShowScreen] = useState(true);

  function Authorization() {
    setShowScreen(false);
    bridge.send('VKWebAppStorageGet', { keys: [globalVariables.authToken] })
      .then(((bridgeData) => {
        const urlParams = new URLSearchParams(window.location.search);

        if (bridgeData.keys[0].value) {
          axios.get(`${globalVariables.serverURL}/api/getTest`, {
            params: {
              token: bridgeData.keys[0].value,
              id: urlParams.get('vk_user_id'),
            },
          })
            .then((srvData) => {
              // Сервер нашёл токен в БД. Переключаемся на главный экран
              console.info('srvData', srvData);
              nextView(globalVariables.view.main);
            })
            .catch((err) => {
              console.info('err', err);
              if (!err.status) {
                // Сервер не отвечает
                setShowScreen(true);
              }
              else {
                // Сервер нашёл токен
                // TODO: сервер должен ответить - валидный токен или нет. Сделать проверку.
                nextView(globalVariables.view.main);
              }
            });
        } else {
          // У клиента нет токена
          console.info('bad');
          nextView(globalVariables.view.start);
        }
      }));
  }

  return (
    <View
      id={id}
      activePanel="Panel404"
      header
    >
      <Panel id="Panel404" centered>
        {!showScreen && <ScreenSpinner />}
        {showScreen && (
          <div className="Page404">
            <div className="Page404-text">
              404
            </div>
            <Button
              mode="secondary"
              onClick={() => Authorization()}
            >
              Обновить
            </Button>
          </div>
        )}

      </Panel>
    </View>
  );
};

Page404.propTypes = {
  id: PropTypes.string.isRequired,
  nextView: PropTypes.func.isRequired,
};
Page404.defaultProps = {};
export default Page404;
