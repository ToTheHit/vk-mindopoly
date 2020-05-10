import React, { useEffect, useState } from 'react';
import {
  Group,
  IOS,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  SimpleCell,
  Text,
  usePlatform,
  Div,
  Card,
  Separator,
  Button,
} from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import './quizResult.css';

import { useSelector } from 'react-redux';
import bridge from '@vkontakte/vk-bridge';
import axios from 'axios';
import Icon32Coins from '../../assets/Quiz/icn32_coins.png';
import Icon32Genius from '../../assets/Quiz/icn32_genius.png';

import QuizResultNew from './Components/QuizResiltNew/QuizResultNew';
import globalVariables from '../../GlobalVariables';

const QuizResult = (props) => {
  const { id, setActivePanel, nextView } = props;
  const platform = usePlatform();

  const quizResult = useSelector((state) => state.quiz.quizResult);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [resultGP, setResultGP] = useState(0);
  const [resultCoins, setResultCoins] = useState(0);

  const [phrase, setPhrase] = useState('-');
  const [wordScore, setWordScore] = useState('');


  useEffect(() => {
    const cases = [2, 0, 1, 1, 1, 2];
    const word = ['очко', 'очка', 'очков'][(correctAnswers % 100 > 4 && correctAnswers % 100 < 20) ? 2 : cases[(correctAnswers % 10 < 5) ? correctAnswers % 10 : 5]];
    setWordScore(word);
  }, [resultGP]);

  useEffect(() => {
    const answers = quizResult.map((item) => item.selectedAnswer);
    bridge.send('VKWebAppStorageGet', { keys: [globalVariables.authToken] })
      .then(((bridgeData) => {
        const urlParams = new URLSearchParams(window.location.search);

        if (bridgeData.keys[0].value) {
          axios.post(`${globalVariables.serverURL}/api/examResults`, {
            answers,
          }, {
            params: {
              token: bridgeData.keys[0].value,
              id: urlParams.get('vk_user_id'),
            },
          })
            .then((data) => {
              console.info(data);
            })
            .catch((err) => {
              console.info('QuizResult, post/examResults', err);
              if (err.response) {
                console.info(err.response.status);
              }
              else {
                console.info('Error 404');
              }
            });
        } else {
          // Перемещение на стартовый экран
        }
      }));
  }, [quizResult]);

  useEffect(() => {
    let counter = 0;
    for (let i = 0; i < quizResult.length; i += 1) {
      if (quizResult[i].selectedAnswerNumber === quizResult[i].correctAnswerNumber) {
        counter += 1;
      }
    }
    setCorrectAnswers(counter);

    setResultCoins(counter * 10);
    setResultGP(counter);

    if (counter < quizResult.length) {
      const percentageCompleted = counter / quizResult.length;
      if (percentageCompleted <= 0.5) setPhrase('Тяжело в учении - легко в бою!');
      else if (percentageCompleted <= 0.75) setPhrase('Неплохой результат!');
      else setPhrase('Хороший результат!');
    }
  }, quizResult);

  return (
    <Panel className="QuizResult" id={id}>
      <PanelHeader
        left={(
          <PanelHeaderBack
            label={(platform === IOS && 'Домой')}
            onClick={() => nextView(globalVariables.view.main)}
          />
        )}
      >
        Результат
      </PanelHeader>
      {correctAnswers === quizResult.length ? (
        <Group className="QuizResult--header">
          <Text>
            Вы не допустили ни одной ошибки!
            <br />
            Поздравляем!
          </Text>
        </Group>
      ) : (
        <Group className="QuizResult--header">
          <Text>
            {`${correctAnswers} из ${quizResult.length} правильных ответов`}
            <br />
            {`${phrase}`}
          </Text>
        </Group>
      )}

      <Div
        style={{ marginTop: '6px' }}
      >
        <Card
          mode="outline"
        >
          <Div className="QuizResult--rowContainer">
            <SimpleCell
              before={<div style={{ backgroundImage: `url(${Icon32Coins})` }} className="QuizResult--icon" />}
            >
              {`+${resultCoins} марок`}
            </SimpleCell>
            <Separator wide />
            <SimpleCell
              before={<div style={{ backgroundImage: `url(${Icon32Genius})` }} className="QuizResult--icon" />}
            >
              {`+${resultGP} ${wordScore} гения`}
            </SimpleCell>
          </Div>
        </Card>
        <div className="QuizResult--buttonRow">
          <Button
            mode="secondary"
            onClick={() => nextView(globalVariables.view.main)}
          >
            Закончить
          </Button>
          <div>
            <Button
              mode="primary"
              onClick={() => {
                bridge.send('VKWebAppShare', { link: 'https://vk.com/app7441788' })
                  .then((data) => {
                    console.info('AppShare -> success', data);
                    nextView(globalVariables.view.main);
                  })

              }}
            >
              Поделиться
            </Button>
            <Text className="QuizResult--buttonRow__description">
              +50 монет
            </Text>
          </div>

        </div>
      </Div>

      <QuizResultNew />
      {/*      {(rightAnswers === quizResult.length
        ? <QuizResultExcellent correctQuestionCount={rightAnswers} />
        : <QuizResultMain quizResult={quizResult} correctQuestionCount={rightAnswers} />)} */}
    </Panel>
  );
};

QuizResult.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
  nextView: PropTypes.func.isRequired,
};
QuizResult.defaultProps = {};
export default QuizResult;
