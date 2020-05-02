import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './quizResultMain.css';
import {
  Div, Footer, Group, Header, Headline, Panel, Separator, Text,
} from '@vkontakte/vkui';
import IconQuizCard from '../../../../assets/Common/IconQuizCard.png';

const QuizResultMain = (props) => {
  const { quizResult } = props;
  const [rightAnswers, setRightAnswers] = useState(0);
  const [endOfWord, setEndOfWord] = useState('');

  useEffect(() => {
    let counter = 0;
    for (let i = 0; i < quizResult.length; i += 1) {
      if (quizResult[i].selectedAnswer === quizResult[i].rightAnswer) {
        counter += 1;
      }
    }
    setRightAnswers(counter);

    /*    if (rightAnswers === 0) setEndOfWord('ов');
    else if (rightAnswers === 1) setEndOfWord('');
    else setEndOfWord('а');
    return () => {
      setEndOfWord('');
    }; */

    if ((quizResult.length - counter) === 1) setEndOfWord('ка');
    else if ((quizResult.length - counter) === 5 || (quizResult.length - counter) === 0) setEndOfWord('ок');
    else setEndOfWord('ки');
  }, quizResult);

  return (
    <div>
      <Group className="QuizResult--header" separator="hide">
        <div>
          <Header
            level={2}
            weight="semibold"
            className="QuizResult--GPcounter"
          >
            +
            {rightAnswers * 10}
          </Header>
          <Header mode="secondary" weight="semibold" className="QuizResult--GPcounter">GP</Header>
        </div>
        <Text>
          {/* {`Вы ответили на ${rightAnswers} вопрос${rightAnswers === 0 ? 'ов' : (rightAnswers === 1) ? '' : 'а'} из ${quizResult.length}`} */}
          {`${rightAnswers} из ${quizResult.length} правильных ответа`}
        </Text>
      </Group>
      <div className="divider" />
      <Group>
        <Div style={{ paddingTop: 0 }}>
          <Headline weight="semibold" style={{ paddingBottom: '5px' }}>
            Работа над
            ошибками
          </Headline>

          {quizResult && quizResult.map((item) => (
            item.rightAnswer !== item.selectedAnswer ? (
              <div key={item.question}>
                <Text className="QuizResult--question">{item.question}</Text>
                <div className="QuizResult--answersBlock">
                  <Text>
                    <span className="QuizResult--answer">Верный ответ:</span>
                    <span className="QuizResult--answer-right">{item.rightAnswer}</span>
                  </Text>
                </div>
              </div>
            ) : <div key={item.question} />
          ))}
          <Footer>
            {`${quizResult.length - rightAnswers} ошиб${endOfWord}`}
            {' '}
          </Footer>
        </Div>


      </Group>
    </div>

  );
};

QuizResultMain.propTypes = {
  quizResult: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string,
    selectedAnswer: PropTypes.string,
    rightAnswer: PropTypes.string,
  })).isRequired,
};
QuizResultMain.defaultProps = {};
export default QuizResultMain;
