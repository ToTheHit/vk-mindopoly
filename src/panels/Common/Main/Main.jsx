import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import {
  Group, Panel, PanelHeader, Separator,
} from '@vkontakte/vkui';
import axios from 'axios';

import './main.css';
import bridge from '@vkontakte/vk-bridge';
import { useDispatch } from 'react-redux';
import Mindbreakers from '../Components/Mindbrakers/Mindbreakers';
import Balance from '../Components/Balance/Balance';
import QuizCard from '../Components/QuizCard/QuizCard';
import globalVariables from '../../../GlobalVariables';

const Main = (props) => {
  const dispatch = useDispatch();
  const {
    id, setActivePanel,
    setSelectedQuestion, nextView,
    setActiveStory, setPopoutMainView,
    popoutMainView,
  } = props;
  const [quizCard, setQuizCard] = useState({
    isAvailable: false, date: '25 апреля',
  });

  const [VKuser, setVKuser] = useState({
    first_name: 'Test',
    last_name: 'User',
    photo_200: 'https://vk.com/images/deactivated_100.png?ava=1',
    GP: 0,
    GPgrowth: 0,
    tax: 0,
    coins: 0,
    worldPlace: 12803312,
    friendsPlace: 4,
  });

  useEffect(() => {
    dispatch({
      type: 'UPDATE_USER_INFO',
      payload: VKuser,
    });
  }, [VKuser]);

  useEffect(() => {
    setPopoutMainView(true);
    bridge.send('VKWebAppStorageGet', { keys: [globalVariables.authToken] })
      .then(((bridgeData) => {
        const urlParams = new URLSearchParams(window.location.search);

        if (bridgeData.keys[0].value) {
          axios.get(`${globalVariables.serverURL}/api/userInfo`, {
            params: {
              token: bridgeData.keys[0].value,
              id: urlParams.get('vk_user_id'),
            },
          })
            .then((data) => {
              // Сервер нашёл токен в БД. Рендерим информацию
              const srvData = data.data.attachment;
              const user = {
                first_name: srvData.first_name,
                last_name: srvData.last_name,
                photo_200: srvData.photo,
                GP: srvData.bp.overall,
                GPgrowth: srvData.bp.today,
                coins: srvData.coins,
                tax: srvData.tax,
              };
              setQuizCard({
                isAvailable: srvData.isExamAvailable, date: '25 апреля',
              });
              setVKuser({ ...VKuser, ...user });
              setPopoutMainView(false);
            })
            .catch((err) => {
              console.info('Main, get/userInfo', err);
              // Сервер не нашёл токен в БД.
              // Перемещение на стартовый экран
              nextView(globalVariables.view.start);
            });
        } else {
          // Перемещение на стартовый экран
          nextView(globalVariables.view.start);
        }
      }));

    // TODO: Для разработки. Удалить для релиза
    setTimeout(() => {
      setPopoutMainView(false);
    }, 2000);
  }, []);

  return (
    <Panel id={id} className="Main">
      <PanelHeader>
        Мозгополия
      </PanelHeader>
      {(!popoutMainView && (
        <Group>

          <div>
            <Balance
              coins={VKuser.coins}
              GP={VKuser.GP}
              tax={VKuser.tax}
              GPgrowth={VKuser.GPgrowth}
            />

            <div>
              {quizCard.isAvailable && (
                <QuizCard nextView={nextView} date={quizCard.date} />
              )}
            </div>

            <Separator style={{ marginTop: '10px' }} />

            <Mindbreakers
              setActivePanel={setActivePanel}
              setSelectedQuestion={setSelectedQuestion}
              setActiveStory={setActiveStory}
            />
          </div>
        </Group>
      ))}
    </Panel>
  );
};

Main.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
  nextView: PropTypes.func.isRequired,
  setActiveStory: PropTypes.func.isRequired,
  setPopoutMainView: PropTypes.func.isRequired,
  popoutMainView: PropTypes.bool.isRequired,
};
Main.defaultProps = {};
export default Main;
