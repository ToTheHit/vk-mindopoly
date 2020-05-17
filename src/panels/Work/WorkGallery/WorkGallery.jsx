import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../work.css';
import { Gallery, Panel, PanelHeader } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import bridge from '@vkontakte/vk-bridge';
import WorkGalleryPanel from './WorkGalleryPanel';
import globalVariables from '../../../GlobalVariables';

const WorkGallery = (props) => {
  const { id, setActivePanel, setIsPreviousQuiz } = props;
  const timeToAnswer = 20;
  const dispatch = useDispatch();
  const modalIsActive = useSelector((state) => state.workViewModal.modalIsActive);
  const userToken = useSelector((state) => state.userToken.token);

  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [lastQuestionInStorage, setLastQuestionInStorage] = useState({
    id: '',
    selectedAnswerNumber: -1,
  });
  const [result, setResult] = useState([]);

  const disableSwipe = useCallback((event) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
      if (!modalIsActive && lastQuestionInStorage.selectedAnswerNumber !== -1) {
        setQuestionIndex(questionIndex + 1);
      }
  }, [modalIsActive]);

  function shuffle(array, prevIndex) {
    const copy = [];
    let n = array.length;
    let i;
    const correctAnswer = array[0];

    // While there remain elements to shuffle…
    while (n) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * array.length);

      // If not already shuffled, move it to the new array.
      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }
    if (prevIndex !== -1) {
      const correctIndex = copy.indexOf(correctAnswer);
      if ((prevIndex === correctIndex) && (Math.random() >= 0.3)) {
        return shuffle(copy, prevIndex);
      }
      return copy;
    }
    return copy;
  }

  // Первое получение всех вопросов
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (userToken) {
      bridge.send('VKWebAppStorageGet', { keys: [globalVariables.quizQuestions, globalVariables.quizResult] })
        .then((storedQuiz) => {
          let storedQuestions = [];
          let storedAnswers = [];
          if (JSON.parse(storedQuiz.keys[0].value.length) > 0) {
            storedQuestions = JSON.parse(storedQuiz.keys[0].value);
            storedAnswers = JSON.parse(storedQuiz.keys[1].value);
            // console.info(storedAnswers.length);
            // console.info('storedAnswers', storedAnswers);
            // console.info(storedQuestions.length);
            // console.info('storedQuestions', storedQuestions);
          }
          if (storedQuestions.length > 0) {
            console.info('storedQuestions', storedQuestions);
            setQuestions(storedQuestions);
            console.info('storedAnswers', storedAnswers);
            if (storedAnswers.length > 0) {
              setIsPreviousQuiz(true);
              setResult(storedAnswers);
              setQuestionIndex(storedAnswers.length);
              setLastQuestionInStorage({
                id: storedAnswers[storedAnswers.length - 1].questionId,
                selectedAnswerNumber: storedAnswers[storedAnswers.length - 1].selectedAnswerNumber,
              });
            }
          } else {
            /*            setQuestions(storedQuestions);
              setResult(storedAnswers);
              setQuestionIndex(storedAnswers.length);
            } else { */
            axios.get(`${globalVariables.serverURL}/api/exam`, {
              params: {
                token: userToken,
                id: urlParams.get('vk_user_id'),
              },
            })
              .then((data) => {
                // Сервер нашёл токен в БД. Рендерим информацию
                const resultFromServer = data.data.attachment.map((item) => ({
                  question: item.text,
                  answers: item.answers,
                  correctAnswerNumber: 0,
                  explanation: item.explanation,
                  theme: globalVariables.translateEnToRu(item.category),
                  requestedBy: item.requestedBy,
                  _id: item._id,
                }));

                for (let i = 0; i < resultFromServer.length; i += 1) {
                  const correctAnswer = resultFromServer[i].answers[0];
                  resultFromServer[i].answers = shuffle(resultFromServer[i].answers, (i > 0 ? resultFromServer[i - 1].correctAnswerNumber : -1));
                  resultFromServer[i].correctAnswerNumber = resultFromServer[i].answers.indexOf(correctAnswer);
                }
                bridge.send('VKWebAppStorageSet', {
                  key: globalVariables.quizQuestions,
                  value: JSON.stringify(resultFromServer),
                });
                setQuestions(resultFromServer);
              })
              .catch((err) => {
                console.error('Work, Get /api/exam', err);
                // Сервер не нашёл токен в БД.
                // Перемещение на стартовый экран
              });
          }
        });
    } else {
      // Перемещение на стартовый экран
    }

    // Выключаем возможность свайпать галерею
    window.addEventListener('touchmove', disableSwipe, { passive: false, capture: true });
    return () => {
      window.removeEventListener('touchmove', disableSwipe, { passive: false, capture: true });
    };
  }, []);

  // Отправка результата квиза в Redux и VK storage
  useEffect(() => {
    if (result.length > 0) {
      dispatch({
        type: 'UPDATE_QUIZ_RESULT',
        payload: result,
      });

      bridge.send('VKWebAppStorageSet', {
        key: globalVariables.quizResult,
        value: JSON.stringify(result),
      });
    }
  }, [result]);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_WORK-VIEW-MODAL',
      payload: {
        questionsLength: questions.length,
        modalIsActive: true,
      },
    });
  }, [questions]);

  function getIncorrectAnswerNumber(correctAnswerNumber) {
    const rndInt = Math.floor(Math.random() * 4);
    if (rndInt === correctAnswerNumber) return getIncorrectAnswerNumber(correctAnswerNumber);
    return rndInt;
  }


  // Нажатие на стрелку
  function goToNextQuestion() {
    if (result.length === questions.length - 1) {
      setActivePanel('QuizResultPanel');
    } else {
      bridge.send('VKWebAppStorageGet', { keys: [globalVariables.quizResult] })
        .then(((data) => {
          let storedQuestions = JSON.parse(data.keys[0].value);
          if (!storedQuestions) storedQuestions = [];
          const rndInt = getIncorrectAnswerNumber(questions[questionIndex + 1].correctAnswerNumber);

          storedQuestions.push({
            correctAnswer: questions[questionIndex + 1].answers[questions[questionIndex + 1].correctAnswerNumber],
            correctAnswerNumber: questions[questionIndex + 1].correctAnswerNumber,
            question: questions[questionIndex + 1].question,
            questionId: questions[questionIndex + 1]._id,
            questionIndex: questionIndex + 1,
            selectedAnswer: questions[questionIndex + 1].answers[rndInt],
            selectedAnswerNumber: rndInt,
          });

          bridge.send('VKWebAppStorageSet', {
            key: globalVariables.quizResult,
            value: JSON.stringify(storedQuestions),
          });

          setQuestionIndex(questionIndex + 1);
        }));
    }
  }

  return (
    <Panel id={id} className="Work" centered={!questions.length}>
      <PanelHeader
        style={{ zIndex: 1 }}
      >
        Мозговой отчёт
      </PanelHeader>

      <div>
        <Gallery
          slideWidth="100%"
          slideIndex={questionIndex}
          align="center"
          onChange={(i) => setQuestionIndex(i)}
          style={{ height: 'auto' }}
        >
          {questions.length > 0 && questions.map((item, index) => (
            <WorkGalleryPanel
              key={`WorkGalleryPanel_${index}`}
              id={`WorkGalleryPanel-${index}`}
              questionIndex={index}
              totalQuestions={questions.length}
              data={{
                question: item.question,
                answers: item.answers,
                correctAnswer: item.correctAnswer,
                correctAnswerNumber: item.correctAnswerNumber,
                explanation: item.explanation,
                theme: item.theme,
                requestedBy: item.requestedBy,
                _id: item._id,
              }}
              setResult={setResult}
              start={(questionIndex === index) && !modalIsActive}
              goToNextQuestion={goToNextQuestion}
              timeToAnswer={timeToAnswer}
              lastQuestionInStorage={lastQuestionInStorage}
            />
          ))}
        </Gallery>
      </div>

    </Panel>
  );
};

WorkGallery.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
  setIsPreviousQuiz: PropTypes.func.isRequired,
};
WorkGallery.defaultProps = {};
export default WorkGallery;
