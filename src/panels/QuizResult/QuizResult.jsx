import React, { useEffect, useState } from 'react';
import {
  IOS, Panel, PanelHeader, PanelHeaderBack, usePlatform,
} from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import './quizResult.css';

import { useSelector } from 'react-redux';
import QuizResultMain from './Components/QuizResultMain/QuizResultMain';
import QuizResultExcellent from './Components/QuizResultExcellent/QuizResultExcellent';

const QuizResult = (props) => {
  const { id, setActivePanel } = props;
  const platform = usePlatform();

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

  console.log(IOS);
  return (
    <Panel className="QuizResult" id={id}>
      <PanelHeader
        left={(
          <PanelHeaderBack
            label={(platform === IOS && 'Назад')}
            onClick={() => setActivePanel('CommonPanel')}
          />
        )}
      >
        Результат
      </PanelHeader>
      {(rightAnswers === quizResult.length
        ? <QuizResultExcellent rightQuestionCount={rightAnswers} />
        : <QuizResultMain quizResult={quizResult} />)}
    </Panel>
  );
};

QuizResult.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
};
QuizResult.defaultProps = {};
export default QuizResult;
