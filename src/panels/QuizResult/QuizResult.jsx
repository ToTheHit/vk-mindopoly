import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './quizResult.css';
import {
  classNames,
  Div,
  Group,
  Header,
  Headline,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Separator,
  Text,
} from '@vkontakte/vkui';
import { useSelector } from 'react-redux';
import IconQuizCard from '../../assets/Common/IconQuizCard.png';
import QuizResultMain from './Components/QuizResultMain/QuizResultMain';
import QuizResultExcellent from './Components/QuizResultExcellent/QuizResultExcellent';

const QuizResult = (props) => {
  const { id, setActivePanel } = props;

  const quizResult = useSelector((state) => state.quiz.quizResult);
  const [rightAnswers, setRightAnswers] = useState(0);

  useEffect(() => {
    let counter = 0;
    for (let i = 0; i < quizResult.length; i += 1) {
      if (quizResult[i].selectedAnswer === quizResult[i].rightAnswer) {
        counter += 1;
      }
    }
    setRightAnswers(counter);
  }, quizResult);


  return (
    <Panel className="QuizResult" id={id}>
      <PanelHeader
        left={<PanelHeaderBack label="Назад" onClick={() => setActivePanel('CommonPanel')} />}
      >
        Ваш результат
      </PanelHeader>

      {(rightAnswers === quizResult.length ? <QuizResultExcellent rightQuestionCount={rightAnswers} /> : <QuizResultMain quizResult={quizResult} />)}

    </Panel>
  );
};

QuizResult.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
};
QuizResult.defaultProps = {};
export default QuizResult;
