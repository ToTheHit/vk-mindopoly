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
import QuizResultMain from './Components/QuizResultMain/QuizResultMain';
import QuizResultExcellent from './Components/QuizResultExcellent/QuizResultExcellent';
import Icon32Coins from '../../assets/Quiz/icn32_coins.png';
import Icon32Genius from '../../assets/Quiz/icn32_genius.png';

import QuizResultNew from './Components/QuizResiltNew/QuizResultNew';

const QuizResult = (props) => {
  const { id, setActivePanel } = props;
  const platform = usePlatform();

  const quizResult = useSelector((state) => state.quiz.quizResult);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [phrase, setPhrase] = useState('-');
  const [wordScore, setWordScore] = useState('');


  useEffect(() => {
    const cases = [2, 0, 1, 1, 1, 2];
    const word = ['очко', 'очка', 'очков'][(correctAnswers % 100 > 4 && correctAnswers % 100 < 20) ? 2 : cases[(correctAnswers % 10 < 5) ? correctAnswers % 10 : 5]];
    setWordScore(word);
  }, [correctAnswers]);

  useEffect(() => {
    let counter = 0;
    for (let i = 0; i < quizResult.length; i += 1) {
      if (quizResult[i].selectedAnswerNumber === quizResult[i].correctAnswerNumber) {
        counter += 1;
      }
    }
    setCorrectAnswers(counter);

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
            onClick={() => setActivePanel('CommonPanel')}
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
              {`+${correctAnswers * 10} монет`}
            </SimpleCell>
            <Separator wide />
            <SimpleCell
              before={<div style={{ backgroundImage: `url(${Icon32Genius})` }} className="QuizResult--icon" />}
            >
              {`+${correctAnswers} ${wordScore} BR`}
            </SimpleCell>
          </Div>
        </Card>
        <div className="QuizResult--buttonRow">
          <Button
            mode="secondary"
            onClick={() => setActivePanel('CommonPanel')}
          >
            Закончить
          </Button>
          <div>
            <Button
              mode="primary"
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
};
QuizResult.defaultProps = {};
export default QuizResult;
