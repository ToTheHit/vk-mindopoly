import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import {
  Group, Panel, PanelHeader, PullToRefresh, Separator, SimpleCell,
} from '@vkontakte/vkui';
import axios from 'axios';

import './main1.css';
import bridge from '@vkontakte/vk-bridge';
import { useDispatch } from 'react-redux';
import Mindbreakers from '../Components/Mindbrakers/Mindbreakers';
import Balance from '../Components/Balance/Balance';
import QuizCard from '../Components/QuizCard/QuizCard';
import globalVariables from '../../../GlobalVariables';


const Main1 = (props) => {
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
  const [effects, setEffects] = useState([]);
  const [questions, setQuestions] = useState([]);
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
  const [updatingView, setUpdatingView] = useState(false);


  function updateView() {
    bridge.send('VKWebAppStorageGet', { keys: [globalVariables.authToken] })
      .then(((bridgeData) => {
        const urlParams = new URLSearchParams(window.location.search);

        if (bridgeData.keys[0].value) {
          axios.all([
            axios.get(`${globalVariables.serverURL}/api/userInfo`, {
              params: {
                token: bridgeData.keys[0].value,
                id: urlParams.get('vk_user_id'),
              },
            }),
            axios.get(`${globalVariables.serverURL}/api/allUserQuestions`, {
              params: {
                token: bridgeData.keys[0].value,
                id: urlParams.get('vk_user_id'),
              },
            }),
          ])
            .then((data) => {
              const srvData = data[0].data.attachment;
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
                isAvailable: srvData.isExamAvailable,
              });
              setVKuser({ ...VKuser, ...user });


              // TODO: К этому придется вернутся, когда доделается Бэк
              const effectsArray = [];
              if (srvData.isExamAvailable) {
                effectsArray.push(
                  {
                    count: user.tax,
                    currency: 'М',
                    description: 'Мозговой налог',
                    icon: <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
                      <g id="icn32_tax" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <path d="M16.072,28.1875 C22.4352812,28.1875 27.7087187,22.9023438 27.7087187,16.5390625 C27.7087187,10.8203125 23.4430937,5.98046875 17.9704375,5.06640625 L17.9704375,3.859375 C17.9704375,3.02734375 17.197,2.74609375 16.54075,3.23828125 L13.400125,5.58203125 C12.97825,5.8984375 12.97825,6.49609375 13.400125,6.82421875 L16.54075,9.15625 C17.1852812,9.63671875 17.9704375,9.35546875 17.9704375,8.546875 L17.9704375,7.08203125 C22.400125,7.9609375 25.7165312,11.8398438 25.7165312,16.5390625 C25.7165312,21.8945312 21.41575,26.171875 16.072,26.1835938 C10.7165312,26.1953125 6.41575,21.90625 6.41575,16.5507812 C6.41575,13.3515625 7.962625,10.5507812 10.3298125,8.79296875 C10.9040312,8.34765625 10.9274687,7.73828125 10.6462187,7.33984375 C10.35325,6.953125 9.7673125,6.77734375 9.1345,7.2578125 C6.2985625,9.296875 4.43528125,12.7421875 4.43528125,16.5507812 C4.43528125,22.796875 10.072,28.1875 16.072,28.1875 Z M20.0798125,17.7226562 C20.6423125,17.7226562 21.0290312,17.4179688 21.0290312,16.890625 C21.0290312,16.3515625 20.6774687,16.0351562 20.0798125,16.0351562 L12.0524687,16.0351562 C11.47825,16.0351562 11.10325,16.3515625 11.10325,16.890625 C11.10325,17.4179688 11.5016875,17.7226562 12.0524687,17.7226562 L20.0798125,17.7226562 Z" id="-tax" fill="#EB4250" fillRule="nonzero" />
                      </g>
                    </svg>,
                  },
                );
              }
              effectsArray.push(
                {
                  count: user.GP,
                  currency: 'GP',
                  description: 'Прирост гения',
                  icon: <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
                    <g id="icn32_genius_plus" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <path d="M23.2753906,21.7890625 C26.0976562,21.7890625 28.4023438,19.6503906 28.6855469,16.9257812 L29.8476562,16.9257812 C30.2871094,16.9257812 30.4628906,16.6621094 30.4628906,16.3007812 L30.4628906,15.9296875 C30.4628906,15.5585938 30.2871094,15.3046875 29.8476562,15.3046875 L28.6171875,15.3046875 C28.1191406,12.8242188 25.921875,10.9296875 23.2753906,10.9296875 C20.7363281,10.9296875 18.6074219,12.6777344 18.0117188,15.03125 C17.5625,14.8554688 17.0351562,14.796875 16.6054688,14.796875 C16.1757812,14.796875 15.6484375,14.8554688 15.1992188,15.03125 C14.59375,12.6777344 12.4648438,10.9296875 9.93554688,10.9296875 C7.2890625,10.9296875 5.09179688,12.8242188 4.59375,15.3046875 L3.36328125,15.3046875 C2.9140625,15.3046875 2.74804688,15.5585938 2.74804688,15.9296875 L2.74804688,16.3007812 C2.74804688,16.6621094 2.9140625,16.9257812 3.36328125,16.9257812 L4.52539062,16.9257812 C4.80859375,19.6503906 7.11328125,21.7890625 9.93554688,21.7890625 C12.9140625,21.7890625 15.3164062,19.3671875 15.3652344,16.4472656 C15.7851562,16.2910156 16.234375,16.2324219 16.6054688,16.2324219 C16.9765625,16.2324219 17.4257812,16.2910156 17.8457031,16.4472656 C17.8945312,19.3964844 20.296875,21.7890625 23.2753906,21.7890625 Z M9.93554688,20.3242188 C7.74804688,20.3242188 5.97070312,18.5566406 5.97070312,16.359375 C5.97070312,14.171875 7.74804688,12.3945312 9.93554688,12.3945312 C12.1132812,12.3945312 13.9003906,14.171875 13.9003906,16.359375 C13.9003906,18.5566406 12.1425781,20.3242188 9.93554688,20.3242188 Z M23.2753906,20.3242188 C21.0683594,20.3242188 19.3105469,18.5566406 19.3105469,16.359375 C19.3105469,14.171875 21.0683594,12.3945312 23.2753906,12.3945312 C25.4628906,12.3945312 27.2402344,14.171875 27.2402344,16.359375 C27.2402344,18.5566406 25.4628906,20.3242188 23.2753906,20.3242188 Z" id="glasses" fill="var(--button_primary_background)" fillRule="nonzero" />
                    </g>
                  </svg>,
                },
              );

              setEffects(effectsArray);
              setQuestions(data[1].data.attachment);

              setPopoutMainView(false);
              setUpdatingView(false);
            })
            .catch((err) => {
              console.info('Main, Get /api/', err);
              // Сервер не нашёл токен в БД.
              // Перемещение на стартовый экран
              // nextView(globalVariables.view.start);
            });
        } else {
          // Перемещение на стартовый экран
          nextView(globalVariables.view.start);
        }
      }));
  }


  useEffect(() => {
    if (updatingView) {
      updateView();
    }
  }, [updatingView]);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_USER_INFO',
      payload: VKuser,
    });
  }, [VKuser]);

  useEffect(() => {
    setPopoutMainView(true);
    axios.all([
      axios.get(`${globalVariables.serverURL}/api/userInfo`, {
        params: {
          token: '43d1c526c48eb2873b026f4efd50813b74da65f6406a41c1d8a24316699d667f',
          id: '31818927',
        },
      }),
      axios.get(`${globalVariables.serverURL}/api/allUserQuestions`, {
        params: {
          token: '43d1c526c48eb2873b026f4efd50813b74da65f6406a41c1d8a24316699d667f',
          id: '31818927',
        },
      }),
    ])
      .then((data) => {
        const srvData = data[0].data.attachment;
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
          isAvailable: srvData.isExamAvailable,
        });
        setVKuser({ ...VKuser, ...user });


        // TODO: К этому придется вернутся, когда доделается Бэк
        const effectsArray = [];
        if (srvData.isExamAvailable) {
          effectsArray.push(
            {
              count: user.tax,
              currency: 'М',
              description: 'Мозговой налог',
              icon: <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
                <g id="icn32_tax" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <path d="M16.072,28.1875 C22.4352812,28.1875 27.7087187,22.9023438 27.7087187,16.5390625 C27.7087187,10.8203125 23.4430937,5.98046875 17.9704375,5.06640625 L17.9704375,3.859375 C17.9704375,3.02734375 17.197,2.74609375 16.54075,3.23828125 L13.400125,5.58203125 C12.97825,5.8984375 12.97825,6.49609375 13.400125,6.82421875 L16.54075,9.15625 C17.1852812,9.63671875 17.9704375,9.35546875 17.9704375,8.546875 L17.9704375,7.08203125 C22.400125,7.9609375 25.7165312,11.8398438 25.7165312,16.5390625 C25.7165312,21.8945312 21.41575,26.171875 16.072,26.1835938 C10.7165312,26.1953125 6.41575,21.90625 6.41575,16.5507812 C6.41575,13.3515625 7.962625,10.5507812 10.3298125,8.79296875 C10.9040312,8.34765625 10.9274687,7.73828125 10.6462187,7.33984375 C10.35325,6.953125 9.7673125,6.77734375 9.1345,7.2578125 C6.2985625,9.296875 4.43528125,12.7421875 4.43528125,16.5507812 C4.43528125,22.796875 10.072,28.1875 16.072,28.1875 Z M20.0798125,17.7226562 C20.6423125,17.7226562 21.0290312,17.4179688 21.0290312,16.890625 C21.0290312,16.3515625 20.6774687,16.0351562 20.0798125,16.0351562 L12.0524687,16.0351562 C11.47825,16.0351562 11.10325,16.3515625 11.10325,16.890625 C11.10325,17.4179688 11.5016875,17.7226562 12.0524687,17.7226562 L20.0798125,17.7226562 Z" id="-tax" fill="#EB4250" fillRule="nonzero" />
                </g>
              </svg>,
            },
          );
        }
        effectsArray.push(
          {
            count: user.GP,
            currency: 'GP',
            description: 'Прирост гения',
            icon: <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
              <g id="icn32_genius_plus" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path d="M23.2753906,21.7890625 C26.0976562,21.7890625 28.4023438,19.6503906 28.6855469,16.9257812 L29.8476562,16.9257812 C30.2871094,16.9257812 30.4628906,16.6621094 30.4628906,16.3007812 L30.4628906,15.9296875 C30.4628906,15.5585938 30.2871094,15.3046875 29.8476562,15.3046875 L28.6171875,15.3046875 C28.1191406,12.8242188 25.921875,10.9296875 23.2753906,10.9296875 C20.7363281,10.9296875 18.6074219,12.6777344 18.0117188,15.03125 C17.5625,14.8554688 17.0351562,14.796875 16.6054688,14.796875 C16.1757812,14.796875 15.6484375,14.8554688 15.1992188,15.03125 C14.59375,12.6777344 12.4648438,10.9296875 9.93554688,10.9296875 C7.2890625,10.9296875 5.09179688,12.8242188 4.59375,15.3046875 L3.36328125,15.3046875 C2.9140625,15.3046875 2.74804688,15.5585938 2.74804688,15.9296875 L2.74804688,16.3007812 C2.74804688,16.6621094 2.9140625,16.9257812 3.36328125,16.9257812 L4.52539062,16.9257812 C4.80859375,19.6503906 7.11328125,21.7890625 9.93554688,21.7890625 C12.9140625,21.7890625 15.3164062,19.3671875 15.3652344,16.4472656 C15.7851562,16.2910156 16.234375,16.2324219 16.6054688,16.2324219 C16.9765625,16.2324219 17.4257812,16.2910156 17.8457031,16.4472656 C17.8945312,19.3964844 20.296875,21.7890625 23.2753906,21.7890625 Z M9.93554688,20.3242188 C7.74804688,20.3242188 5.97070312,18.5566406 5.97070312,16.359375 C5.97070312,14.171875 7.74804688,12.3945312 9.93554688,12.3945312 C12.1132812,12.3945312 13.9003906,14.171875 13.9003906,16.359375 C13.9003906,18.5566406 12.1425781,20.3242188 9.93554688,20.3242188 Z M23.2753906,20.3242188 C21.0683594,20.3242188 19.3105469,18.5566406 19.3105469,16.359375 C19.3105469,14.171875 21.0683594,12.3945312 23.2753906,12.3945312 C25.4628906,12.3945312 27.2402344,14.171875 27.2402344,16.359375 C27.2402344,18.5566406 25.4628906,20.3242188 23.2753906,20.3242188 Z" id="glasses" fill="var(--button_primary_background)" fillRule="nonzero" />
              </g>
            </svg>,
          },
        );

        setEffects(effectsArray);
        setQuestions(data[1].data.attachment);


        setPopoutMainView(false);
        setUpdatingView(false);
      })
      .catch((err) => {
        console.info('Main, Get /api/', err);
        // Сервер не нашёл токен в БД.
        // Перемещение на стартовый экран
        // nextView(globalVariables.view.start);
      });
    // updateView();

    // TODO: Для разработки. Удалить для релиза
    setTimeout(() => {
      setPopoutMainView(false);
    }, 2000);
  }, []);

  const testQue = {
    answers: [
      'Навёл',
      'Рвунг',
      'Защем',
      'Выйду',
    ],
    approved: true,
    bpEarned: {
      overall: 20,
      today: 0,
      yesterday: 0,
    },
    bpForError: 20,
    category: 'Russian',
    error_count: {
      overall: 0,
      today: 0,
      yesterday: 0,
    },
    requestedBy: 31818927,
    text: 'Разонравится ',
    views: {
      overall: 1,
      today: 0,
      yesterday: 0,
    },
  };

  return (
    <Panel id={id} className="Main">
      <PanelHeader className={'Main--header'}>
        Мозгополия
      </PanelHeader>
      {/* {(!popoutMainView && ( */}
      <PullToRefresh onRefresh={() => setUpdatingView(true)} isFetching={updatingView}>
        <Balance
          coins={VKuser.coins}
          GP={VKuser.GP}
          tax={VKuser.tax}
          GPgrowth={VKuser.GPgrowth}
          effects={effects}
        />

        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>

{/*        <Mindbreakers
          setActivePanel={setActivePanel}
          setSelectedQuestion={setSelectedQuestion}
          setActiveStory={setActiveStory}
          questions={questions}
        />*/}

        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <SimpleCell
          onClick={() => {
            setSelectedQuestion(testQue);
            setActivePanel('QuestionDetails');
          }}
        >quest</SimpleCell>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>

{/*
        <Group className={(popoutMainView && 'hidden')}>
          <div>
            <Balance
              coins={VKuser.coins}
              GP={VKuser.GP}
              tax={VKuser.tax}
              GPgrowth={VKuser.GPgrowth}
              effects={effects}
            />

            <div>
              {quizCard.isAvailable && (
              <QuizCard nextView={nextView} />
              )}
            </div>

            {((!effects.length && !quizCard.isAvailable) && (
            <Separator />
            ))}

            <Mindbreakers
              setActivePanel={setActivePanel}
              setSelectedQuestion={setSelectedQuestion}
              setActiveStory={setActiveStory}
              questions={questions}
            />
          </div>


           // ))}

          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <SimpleCell onClick={() => setActivePanel('1')}>Next panel</SimpleCell>
        </Group>
      */}
      </PullToRefresh>

    </Panel>
  );
};

Main1.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
  nextView: PropTypes.func.isRequired,
  setActiveStory: PropTypes.func.isRequired,
  setPopoutMainView: PropTypes.func.isRequired,
  popoutMainView: PropTypes.bool.isRequired,
};
Main1.defaultProps = {};
export default Main1;
