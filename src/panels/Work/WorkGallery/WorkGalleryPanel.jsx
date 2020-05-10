import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Cell, Div, Panel, Text, Title,
} from '@vkontakte/vkui';
import Icon28ArrowRightOutline from '@vkontakte/icons/dist/28/arrow_right_outline';
import QuizBlock from '../QuizBlock/QuizBlock';

const WorkGalleryPanel = (props) => {
  const {
    id, questionIndex, data, totalQuestions, timeToAnswer, setResult, start, goToNextQuestion,
  } = props;

  const panelRef = useRef(null);
  const [showArrowNext, setShowArrowNext] = useState(false);
  const [time, setTime] = useState(timeToAnswer);
  const [systemTime, setSystemTime] = useState(0);
  const [startInterval, setStartInterval] = useState(false);

  useEffect(() => {
    setSystemTime(Date.now());
    setStartInterval(start);
  }, [start]);

  useEffect(() => {
    // console.log(questionIndex, start);
  }, [start]);

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
    if (time <= 0) {
      setStartInterval(false);
      setShowArrowNext(true);
    }
  }, [time]);

  // Вызывается после окончания таймера, либо после выбранного ответа
  function onCompleteQuestion(
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
        question,
        selectedAnswer,
        correctAnswer,
        selectedAnswerNumber,
        correctAnswerNumber,
      }]);
    }
  }

  function nextQuestion() {
    goToNextQuestion(questionIndex + 1);
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
              Вопрос
              {' '}
              {questionIndex}
              {' '}
              из
              {' '}
              {totalQuestions - 1}
            </Text>
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
            <div className="Work--timer__gradient-mask" />
            <div className="Work--timer__time">
              <Title level={2}>{(time > 0 ? time.toFixed(0) : 0)}</Title>
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
        }}
        time={time}
        onComplete={onCompleteQuestion}
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
    requestedBy: PropTypes.oneOf([PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      photo: PropTypes.string,
    }), PropTypes.number]),
  }).isRequired,
  timeToAnswer: PropTypes.number,
  setResult: PropTypes.func.isRequired,
  start: PropTypes.bool.isRequired,
  goToNextQuestion: PropTypes.func.isRequired,
};
WorkGalleryPanel.defaultProps = {
  timeToAnswer: 10,
};
export default WorkGalleryPanel;
