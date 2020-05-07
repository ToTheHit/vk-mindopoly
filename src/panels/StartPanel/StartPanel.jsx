import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Panel, Gallery, ScreenSpinner } from '@vkontakte/vkui';
import { useSelector } from 'react-redux';

import './startPanel.css';

import bridge from '@vkontakte/vk-bridge';
import axios from 'axios';
import StartPanel1 from './Components/StartPanel1';
import StartPanel2 from './Components/StartPanel2';
import globalVariables from '../../GlobalVariables';

const StartPanel = (props) => {
  const { id, nextView } = props;

  const [slideIndex, setSlideIndex] = useState(0);
  const [showScreen, setShowScreen] = useState(true);

  const scheme = useSelector((state) => state.schemeChanger.scheme);

  useEffect(() => {
/*    bridge.send('VKWebAppStorageGet', { keys: [globalVariables.authToken] })
      .then(((bridgeData) => {
        const urlParams = new URLSearchParams(window.location.search);

        if (bridgeData.keys[0].value) {
          axios.get(`${globalVariables.serverURL}/api/getTest`, {
            params: {
              token: bridgeData.keys[0].value,
              id: urlParams.get('vk_user_id'),
            },
          })
            .then(() => {
              // Сервер нашёл токен в БД. Переключаемся на главный экран
              nextView(globalVariables.view.main);
            })
            .catch(() => {
              // Сервер не нашёл токен в БД. Продолжаем регистрацию
              setShowScreen(true);
            });
        } else {
          setShowScreen(true);
        }
      }));*/
  }, []);

  return (
    <Panel id={id} className="StartPanel" centered={!showScreen}>
      {!showScreen && <ScreenSpinner />}
      {showScreen && (
        <Gallery
          slideWidth="100%"
          style={{ height: '100vh' }}
          bullets={((scheme === 'bright_light') || (scheme === 'client_light') ? 'dark' : 'light')}
          className="Start1--gallery"
          slideIndex={slideIndex}
          onChange={(index) => setSlideIndex(index)}
        >
          <StartPanel1 id="StartPanel-page-1" goToNextSlide={setSlideIndex} />
          <StartPanel2 id="StartPanel-page-2" nextView={nextView} />
        </Gallery>
      )}
    </Panel>
  );
};

StartPanel.propTypes = {
  id: PropTypes.string.isRequired,
  nextView: PropTypes.func.isRequired,
};

export default StartPanel;
