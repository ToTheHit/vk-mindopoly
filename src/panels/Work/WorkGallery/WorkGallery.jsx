import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../work.css';
import {
  Gallery, ModalCard, ModalRoot, Panel, PanelHeader, ScreenSpinner,
} from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import bridge from '@vkontakte/vk-bridge';
import axios from 'axios';
import WorkGalleryPanel from './WorkGalleryPanel';
import globalVariables from '../../../GlobalVariables';

const WorkGallery = (props) => {
  const { id, setActivePanel, nextView } = props;
  const timeToAnswer = 20;
  const dispatch = useDispatch();

  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [activeModal, setActiveModal] = useState('Work--readyCheck');
  const [result, setResult] = useState([]);

  const disableSwipe = useCallback((event) => {
    event.stopPropagation();
  }, []);

  // Первое получение всех вопросов
  useEffect(() => {
    bridge.send('VKWebAppStorageGet', { keys: [globalVariables.authToken] })
      .then(((bridgeData) => {
        const urlParams = new URLSearchParams(window.location.search);

        if (bridgeData.keys[0].value) {
          axios.get(`${globalVariables.serverURL}/api/exam`, {
            params: {
              token: bridgeData.keys[0].value,
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
              }));
              setQuestions(resultFromServer);
              console.info(data.data.attachment)
            })
            .catch((err) => {
              console.info('Work, Get /api/exam', err);
              // Сервер не нашёл токен в БД.
              // Перемещение на стартовый экран
            });
        } else {
          // Перемещение на стартовый экран
        }
      }));

/*    setQuestions([
      {
        question: 'test1',
        answers: [1,2,3,4],
        correctAnswerNumber: 0,
        explanation: 'test test',
        theme: 'Math',
        requestedBy: {
          first_name: 'Имя',
          last_name: 'Фамилия',
          photo: 'https://vk.com/images/deactivated_100.png?ava=1',
        },
      },
      {
        question: 'test2',
        answers: [1,2,3,4],
        correctAnswerNumber: 0,
        explanation: 'test test',
        theme: 'Math',
        requestedBy: 0,
      },
      {
        question: 'test3',
        answers: [1,2,3,4],
        correctAnswerNumber: 0,
        explanation: 'test test',
        theme: 'Math',
        requestedBy: {
          first_name: 'Имя',
          last_name: 'Фамилия',
          photo: 'https://vk.com/images/deactivated_100.png?ava=1',
        },
      },
      {
        question: 'test4',
        answers: [1,2,3,4],
        correctAnswerNumber: 0,
        explanation: 'test test',
        theme: 'Math',
        requestedBy: {
          first_name: 'Имя',
          last_name: 'Фамилия',
          photo: 'https://vk.com/images/deactivated_100.png?ava=1',
        },
      },
    ]);*/

    // Выключаем возможность свайпать галерею
    window.addEventListener('touchmove', disableSwipe, { passive: false, capture: true });
    return () => {
      setQuestions([]);
      setQuestionIndex(0);
      setActiveModal('Work--readyCheck');
      setResult([]);
      window.removeEventListener('touchmove', disableSwipe, { passive: false, capture: true });
    };
  }, []);

  // Отправка результата квиза в Redux
  useEffect(() => {
    dispatch({
      type: 'UPDATE_QUIZ_RESULT',
      payload: result,
    });
  }, [result]);

  function goToNextQuestion() {
    if (result.length === questions.length - 1) {
      setActivePanel('QuizResultPanel');
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  }

  return (
    <Panel id={id} className="Work" centered={!questions.length}>
      <PanelHeader
        style={{ zIndex: 1 }}
      >
        Мозговой отчёт
      </PanelHeader>


      {questions.length ? (
        <div>
          <ModalRoot activeModal={activeModal}>
            <ModalCard
              id="Work--readyCheck"
              icon={<Icon56ErrorOutline style={{ transform: 'rotate(180deg)' }} />}
              header={`${questions.length} вопросов из разных тем. 20 секунд на один вопрос.\nВы готовы?`}
              actions={[
                {
                  title: 'Отложить',
                  mode: 'secondary',
                  action: () => nextView(globalVariables.view.main),
                },
                {
                  title: 'Начать',
                  mode: 'primary',
                  action: () => setActiveModal(null),
                },
              ]}
              onClose={() => setActiveModal(null)}
            />
          </ModalRoot>
          <Gallery
            slideWidth="100%"
            slideIndex={questionIndex}
            align="center"
            onChange={(i) => setQuestionIndex(i)}
            style={{ height: 'auto' }}
          >
            {questions.map((item, index) => (
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
                }}
                setResult={setResult}
                start={(questionIndex === index) && !activeModal}
                goToNextQuestion={goToNextQuestion}
                timeToAnswer={timeToAnswer}
              />
            ))}
          </Gallery>
        </div>
      )
        : <ScreenSpinner />}

    </Panel>
  );
};

WorkGallery.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
  nextView: PropTypes.func.isRequired,
};
WorkGallery.defaultProps = {};
export default WorkGallery;
