import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './work.css';
import {
  Button,
  Cell,
  Div,
  ModalCard,
  ModalRoot,
  Panel,
  PanelHeader,
  Spinner,
  Text,
  Title,
} from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import Icon28ArrowRightOutline from '@vkontakte/icons/dist/28/arrow_right_outline';
import QuizBlock from './QuizBlock/QuizBlock';

const Work = (props) => {
  const { id, setActivePanel } = props;
  const timeToAnswer = 999;
  const delayTime = 2;
  const dispatch = useDispatch();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isWarmUp, setIsWarmUp] = useState(true);
  const [time, setTime] = useState(timeToAnswer);
  const [activeModal, setActiveModal] = useState('Work--readyCheck');
  const [startInterval, setStartInterval] = useState(false);
  const [result, setResult] = useState([]);
  const [showArrowNext, setShowArrowNext] = useState(false);

  // Первое получение всех вопросов
  useEffect(() => {
    setTimeout(() => {
      const resultFromServer = [
        {
          question: 'Что кричал Волк Зайцу в известном мультфильме времён СССР?',
          answers: ['Ну, догоню!', 'Ну, погоди!', 'Ну, попробуй!', 'Ну, что народ, погнали?!'],
          rightAnswer: 'Ну, погоди!',
          explanation: '«Ну, заяц, погоди!», — кричал знаменитый персонаж Союз Мультфильма. '
            + 'Интересно, что цитата стала весьма популярной у взрослых.',
          theme: 'Детский',
        },
        {
          question: 'Буга вуга?',
          answers: ['Дирижабль, ага!', 'Fuuu', 'Ра-та-та-та!', 'Конечно'],
          rightAnswer: 'Конечно',
          explanation: '«Ну, заяц, погоди!», — кричал знаменитый персонаж Союз Мультфильма. '
            + 'Интересно, что цитата стала весьма популярной у взрослых.',
          theme: 'Рофел',
        },
        {
          question: 'Металл, вызывающий лихорадку?',
          answers: ['Серебро', 'Вибраниум', 'Золото', 'Медь'],
          rightAnswer: 'Золото',
          explanation: '«Ну, заяц, погоди!», — кричал знаменитый персонаж Союз Мультфильма. '
            + 'Интересно, что цитата стала весьма популярной у взрослых.',
          theme: 'Химия',
        },
      ];
      setCurrentQuestion(resultFromServer[questionIndex]);
      setQuestions(resultFromServer);
    }, 1000);

    return () => {
      setQuestions([]);
      setCurrentQuestion(null);
      setQuestionIndex(0);
      setIsWarmUp(true);
      setTime(timeToAnswer);
      setActiveModal('Work--readyCheck');
      setResult([]);
      setShowArrowNext(false);
    };
  }, []);

  function start() {
    setActiveModal(null);
    // Запуск таймера
    setStartInterval(true);
  }

  useEffect(() => {
    setQuestionIndex(questionIndex);
    if (questionIndex !== 0 && questionIndex < questions.length) {
      setCurrentQuestion(questions[questionIndex]);
      setTime(timeToAnswer);
      start();
    }
  }, [questionIndex]);

  useEffect(() => {
    setResult(result);
    dispatch({
      type: 'UPDATE_QUIZ_RESULT',
      payload: result,
    });
  }, [result]);

  function onCompleteQuestion(question, selectedAnswer, rightAnswer) {
    setStartInterval(false);
    setShowArrowNext(true);
    setTimeout(() => {
      if (questionIndex === 0) {
        setIsWarmUp(false);
      } else {
        setResult((prevResult) => [...prevResult, {
          questionIndex, question, selectedAnswer, rightAnswer,
        }]);
      }
      if (questionIndex + 1 < questions.length) {
        setQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
      } else if (questionIndex !== 0) {
        setActivePanel('QuizResultPanel');
      }
      setShowArrowNext(false);
    }, delayTime * 1000);
  }

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
    }
  }, [time]);

  return (
    <Panel id={id} className="Work">
      <PanelHeader>
        Самостоялка
      </PanelHeader>

      <ModalRoot activeModal={activeModal}>
        <ModalCard
          id="Work--readyCheck"
          icon={<Icon56ErrorOutline style={{ transform: 'rotate(180deg)' }} />}
          header="Пять вопросов из разных тем. Десять секунд на один вопрос.
                  Готовы начать?"
          actions={[
            {
              title: 'Отложить',
              mode: 'secondary',
              action: () => setActivePanel('CommonPanel'),
            },
            {
              title: 'Начать',
              mode: 'primary',
              action: () => start(),
            },
          ]}
          onClose={() => start()}
        />
      </ModalRoot>

      <Div className="Work--subTitle">
        {(isWarmUp ? (
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
            description={currentQuestion.theme}
          >
            <Text>
              Вопрос
              {' '}
              {questionIndex}
              {' '}
              из
              {' '}
              {questions.length - 1}
            </Text>
          </Cell>

        ))}

        {showArrowNext ? (
          <div className="Work--arrowNext">
            <Button mode="secondary">
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
      {(currentQuestion ? (
        <QuizBlock
          data={{
            question: currentQuestion.question,
            answers: currentQuestion.answers,
            rightAnswer: currentQuestion.rightAnswer,
            explanation: currentQuestion.explanation,
          }}
          time={time}
          onComplete={onCompleteQuestion}
        />
      ) : <Spinner size="large" />)}

    </Panel>
  );
};

Work.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
};
Work.defaultProps = {};
export default Work;
