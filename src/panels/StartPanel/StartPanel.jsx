import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Panel, Gallery, ScreenSpinner, Button, classNames,
} from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';

import './startPanel.css';

import bridge from '@vkontakte/vk-bridge';
import axios from 'axios';
import StartPanel1 from './Components/StartPanel1';
import StartPanel2 from './Components/StartPanel2';
import globalVariables from '../../GlobalVariables';
import StartPanelPage1 from './Components/StartPanelPage1';
import StartPanelPage2 from './Components/StartPanelPage2';
import StartPanelPage3 from './Components/StartPanelPage3';

const StartPanel = (props) => {
  const { id, nextView, popoutState } = props;
  const dispatch = useDispatch();

  const [slideIndex, setSlideIndex] = useState(0);
  const [readyToShow, setReadyToShow] = useState(false);

  const scheme = useSelector((state) => state.schemeChanger.scheme);

  useEffect(() => {
    bridge.send('VKWebAppStorageGet', { keys: [globalVariables.authToken] })
      .then(((bridgeData) => {
        const urlParams = new URLSearchParams(window.location.search);

        if (bridgeData.keys[0].value) {
          dispatch({
            type: 'UPDATE_TOKEN',
            payload: {
              token: bridgeData.keys[0].value,
            },
          });
          axios.get(`${globalVariables.serverURL}/api/getTest`, {
            params: {
              token: bridgeData.keys[0].value,
              id: urlParams.get('vk_user_id'),
            },
          })
            .then(() => {
              // Сервер нашёл токен в БД. Переключаемся на главный экран
              // Обновляем токен друзей для лидерборда
              if (localStorage.getItem(globalVariables.friendsAccessToken)) {
                bridge.send('VKWebAppGetAuthToken', { app_id: 7441788, scope: 'friends' })
                  .then((data) => {
                    localStorage.setItem(globalVariables.friendsAccessToken, data.access_token);
                  });
              }

              nextView(globalVariables.view.main);
            })
            .catch(() => {
              // Сервер не нашёл токен в БД. Продолжаем регистрацию
              setReadyToShow(true);
              popoutState.setPopoutIsActive(false);
            });
        } else {
          setReadyToShow(true);
          popoutState.setPopoutIsActive(false);
        }
        // popoutState.setPopoutIsActive(false);
      }));
  }, [nextView]);

  function Registration() {
    popoutState.setPopoutIsActive(true);

    axios.get(`${globalVariables.serverURL}/api/registerUser${window.location.search}`)
      .then((data) => {
        dispatch({
          type: 'UPDATE_TOKEN',
          payload: {
            token: data.data.attachment.token,
          },
        });

        bridge.send('VKWebAppStorageSet', {
          key: globalVariables.authToken,
          value: data.data.attachment.token,
        })
          .then((data) => {
            console.info('success', data);
            nextView(globalVariables.view.main);
          });
      })
      .catch((err) => {
        console.error((err));
        if (!err.status) {
          // Сервер не отвечает
          popoutState.setPopoutIsActive(false);
        }
      });
  }

  return (
    <Panel id={id} className="StartPanel">
      <Gallery
        slideWidth="100%"
        style={{ height: '100vh' }}
        bullets={(readyToShow ? (((scheme === 'bright_light') || (scheme === 'client_light') ? 'dark' : 'light')) : false)}
        className="Start1--gallery"
        slideIndex={slideIndex}
        onChange={(index) => setSlideIndex(index)}
      >
        <StartPanelPage1 id="StartPanel-page-1" goToNextSlide={setSlideIndex} readyToShow={readyToShow} />
        <StartPanelPage2 id="StartPanel-page-2" goToNextSlide={setSlideIndex} />
        <StartPanelPage3 id="StartPanel-page-2" nextView={nextView} />
      </Gallery>
      {(slideIndex === 2 ? (
        <Button
          className="StartPanel--button"
          size="l"
          mode="commerce"
          onClick={() => {
            Registration();
          }}
        >
          Начать
        </Button>
      )
        : (
          <Button
            className={classNames('StartPanel--button', { 'StartPanel--content-hidden': !readyToShow })}
            size="l"
            onClick={() => {
              setSlideIndex(slideIndex + 1);
            }}
          >
            Дальше
          </Button>
        ))}

    </Panel>
  );
};

StartPanel.propTypes = {
  id: PropTypes.string.isRequired,
  nextView: PropTypes.func.isRequired,
  popoutState: PropTypes.shape({
    popoutIsActive: PropTypes.bool,
    setPopoutIsActive: PropTypes.func,
  }).isRequired,
};

export default StartPanel;
