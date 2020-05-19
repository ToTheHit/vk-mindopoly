import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Cell, Div, Panel, Text, Title,
} from '@vkontakte/vkui';
import Icon28ArrowRightOutline from '@vkontakte/icons/dist/28/arrow_right_outline';
import QuizBlock from '../QuizBlock/QuizBlock';
import ProgressRing from '../../CustomComponents/ProgressRing/ProgressRing';

const WorkGalleryPanel = (props) => {
  const {
    id, questionIndex, data, totalQuestions, timeToAnswer, setResult, start, goToNextQuestion, lastQuestionInStorage,
  } = props;

  const panelRef = useRef(null);
  const [showArrowNext, setShowArrowNext] = useState(false);
  const [time, setTime] = useState(timeToAnswer);
  const [systemTime, setSystemTime] = useState(0);
  const [startInterval, setStartInterval] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  useEffect(() => {
    setSystemTime(Date.now());
    setStartInterval(start);
  }, [start]);

  useEffect(() => {
    setTimeProgress(100 + (time / timeToAnswer) * -100);
  }, [time]);

  // Интервал
  useEffect(() => {
    let intervalId;
    if (startInterval) {
      let prevSystemTime = Date.now();
      intervalId = setInterval(() => {
        const seconds = ((Date.now() - prevSystemTime) / 1000).toFixed(1);
        prevSystemTime = Date.now();
        setTime((oldTime) => oldTime - seconds);
      }, 500);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [startInterval]);

  // Остановка интервала
  useEffect(() => {
    //
    if (time <= 0) {
      setStartInterval(false);
      setShowArrowNext(true);
    }
  }, [time]);

  useEffect(() => {
    if (data._id === lastQuestionInStorage.id) {
      setShowArrowNext(true);
    }
  }, [lastQuestionInStorage.id]);

  // Вызывается после окончания таймера, либо после выбранного ответа
  function onCompleteQuestion(
    questionId,
    question,
    selectedAnswer,
    correctAnswer,
    selectedAnswerNumber,
    correctAnswerNumber,
  ) {
    setStartInterval(false);
    setShowArrowNext(true);

    if (questionIndex !== 0) {
      setResult((prevResult) => [...prevResult, {
        questionIndex,
        questionId,
        question,
        selectedAnswer,
        correctAnswer,
        selectedAnswerNumber,
        correctAnswerNumber,
      }]);
    }
  }

  return (
    <Panel id={id} className="WorkGalleryPanel" getRootRef={panelRef}>
      <Div className="Work--subTitle">
        {(questionIndex === 0 ? (
          <Cell
            multiline
            description="Не учитывается"
          >
            <Text>
              Вопрос для разогрева
            </Text>
          </Cell>
        ) : (
          <Cell
            multiline
            description={data.theme}
          >
            <Text>
              {`Вопрос ${questionIndex} из ${totalQuestions - 1}`}
            </Text>
{/*            <Text>
              {`Storage last ID: ${lastQuestionInStorage.id}`}
            </Text>
            <Text>
              {`This quiz ID: ${data._id}`}
            </Text>*/}
          </Cell>
        ))}

        {showArrowNext ? (
          <div className="Work--arrowNext">
            <Button mode="secondary" onClick={() => goToNextQuestion()}>
              <Icon28ArrowRightOutline />
            </Button>
          </div>
        ) : (
          <div className="Work--timer">
            <div className="Work--timer__gradient" />
            <ProgressRing
              className="Work--timer__circle"
              radius={34}
              stroke={5}
              initialStrokeDashoffest={151}
              progress={-1 * timeProgress}
              transitionDuration={500}
            />
            <div className="Work--timer__gradient-mask" />
            <div className="Work--timer__time">
              <Title level={2} weight="semibold">{(time > 0 ? time.toFixed(0) : 0)}</Title>
            </div>
          </div>
        )}
      </Div>
      <QuizBlock
        data={{
          question: data.question,
          answers: data.answers,
          correctAnswer: data.correctAnswer,
          correctAnswerNumber: data.correctAnswerNumber,
          explanation: data.explanation,
          requestedBy: data.requestedBy,
          _id: data._id,
        }}
        time={time}
        onComplete={onCompleteQuestion}
        lastQuestionInStorage={lastQuestionInStorage}
      />
    </Panel>
  );
};

WorkGalleryPanel.propTypes = {
  id: PropTypes.string.isRequired,
  questionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  data: PropTypes.shape({
    question: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.string),
    correctAnswer: PropTypes.string,
    correctAnswerNumber: PropTypes.number,
    explanation: PropTypes.string,
    theme: PropTypes.string,
    requestedBy: PropTypes.oneOfType([PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      photo: PropTypes.string,
    }), PropTypes.number]),
    _id: PropTypes.string,
  }).isRequired,
  timeToAnswer: PropTypes.number,
  setResult: PropTypes.func.isRequired,
  start: PropTypes.bool.isRequired,
  goToNextQuestion: PropTypes.func.isRequired,
  lastQuestionInStorage: PropTypes.shape({
    id: PropTypes.string,
    selectedAnswerNumber: PropTypes.number,
  }),
};
WorkGalleryPanel.defaultProps = {
  timeToAnswer: 10,
  lastQuestionInStorage: {
    id: '',
    selectedAnswerNumber: -1,
  },
};
export default WorkGalleryPanel;
