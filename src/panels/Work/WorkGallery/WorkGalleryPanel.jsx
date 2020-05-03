import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Cell, Div, Panel, Text, Title,
} from '@vkontakte/vkui';
import Icon28ArrowRightOutline from '@vkontakte/icons/dist/28/arrow_right_outline';
import QuizBlock from '../QuizBlock/QuizBlock';

const WorkGalleryPanel = (props) => {
  const {
    id, questionIndex, data, totalQuestions, timeToAnswer, updateResult, start, goToNextQuestion,
  } = props;

  const panelRef = useRef(null);
  const [showArrowNext, setShowArrowNext] = useState(false);
  const [time, setTime] = useState(timeToAnswer);
  const [startInterval, setStartInterval] = useState(false);
  const [summaryData, setSummaryData] = useState({});

  useEffect(() => {
    // Убираем возможность свайпа для Галереи
    panelRef.current.childNodes[0].addEventListener('touchmove', (event) => {
      event.stopPropagation();
    });
  }, []);

  useEffect(() => {
    setStartInterval(start);
  }, [start]);

  // Интервал
  useEffect(() => {
    let intervalId;
    if (startInterval) {
      intervalId = setInterval(() => {
        setTime((oldTime) => oldTime - 1);
      }, 1000);
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
  function onCompleteQuestion(question, selectedAnswer, rightAnswer) {
    setStartInterval(false);
    setShowArrowNext(true);
    setSummaryData({
      questionIndex, question, selectedAnswer, rightAnswer,
    });
  }

  function nextQuestion() {
    if (questionIndex !== 0) {
      updateResult((prevResult) => [...prevResult, summaryData]);
    }
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
            <Button mode="secondary" onClick={() => nextQuestion()}>
              <Icon28ArrowRightOutline />
            </Button>
          </div>
        ) : (
          <div className="Work--timer">
            <div className="Work--timer__gradient" />
            <div className="Work--timer__gradient-mask" />
            <div className="Work--timer__time">
              <Title level={2}>{(time > 0 ? time : 0)}</Title>
            </div>
          </div>
        )}
      </Div>
      <QuizBlock
        data={{
          question: data.question,
          answers: data.answers,
          rightAnswer: data.rightAnswer,
          explanation: data.explanation,
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
    rightAnswer: PropTypes.string,
    explanation: PropTypes.string,
    theme: PropTypes.string,
  }).isRequired,
  timeToAnswer: PropTypes.number,
  updateResult: PropTypes.func.isRequired,
  start: PropTypes.bool.isRequired,
  goToNextQuestion: PropTypes.func.isRequired,
};
WorkGalleryPanel.defaultProps = {
  timeToAnswer: 10,
};
export default WorkGalleryPanel;