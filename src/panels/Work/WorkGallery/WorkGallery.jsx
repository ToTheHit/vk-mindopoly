import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../work.css';
import {
  Gallery, ModalCard, ModalRoot, Panel, PanelHeader, ScreenSpinner,
} from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import WorkGalleryPanel from './WorkGalleryPanel';

const WorkGallery = (props) => {
  const { id, setActivePanel } = props;
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
    setTimeout(() => {
      const resultFromServer = [
        {
          question: 'Как называют края шляпы?',
          answers: ['Нивы', 'Огороды', 'Поля', 'Уделы'],
          correctAnswer: 'Поля',
          correctAnswerNumber: 2,
          explanation: '[Заглушка под пояснение]',
          theme: 'Эмм...',
        },
        {
          question: 'Какая пометка, сделанная возле абзаца, обозначает, что на него надо обратить особое внимание?',
          answers: ['NB', 'FX', 'AA', 'PS'],
          correctAnswer: 'NB',
          correctAnswerNumber: 0,
          explanation: '[Заглушка под пояснение]',
          theme: 'Русский язык',
        },
        {
          question: 'Какой из этих писателей написал "Азбуку" и "Новую Азбуку"?',
          answers: ['Николай Некрасов', 'Александр Пушкин', 'Лев Толстой', 'Иван Тургенев'],
          correctAnswer: 'Лев Толстой',
          correctAnswerNumber: 2,
          explanation: '[Заглушка под пояснение]',
          theme: 'Русский язык',
        },
        {
          question: 'Зачем дятел стучит по дереву?',
          answers: ['Привлекает самку', 'Строит гнездо', 'Греется', 'Ищет еду'],
          correctAnswer: 'Ищет еду',
          correctAnswerNumber: 3,
          explanation: 'Потому что он дятел',
          theme: 'Биология',
        },
        {
          question: 'Какое единственное уязвимое место было у Ахиллеса?',
          answers: ['Голова', 'Пятка', 'Шея', 'Ладонь'],
          correctAnswer: 'Пятка',
          correctAnswerNumber: 1,
          explanation: '[Заглушка под пояснение]',
          theme: 'Мифология',
        },
        {
          question: 'К какой группе музыкальных инструментов относится челеста?',
          answers: ['Ударно-клавишные', 'Струнные', 'Духовные', 'Электромузыкальные'],
          correctAnswer: 'Ударно-клавишные',
          correctAnswerNumber: 0,
          explanation: '[Заглушка под пояснение]',
          theme: 'Музыка',
        },
      ];
      setQuestions(resultFromServer);
    }, 1000);

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
                }}
                setResult={setResult}
                start={(questionIndex === index) && !activeModal}
                goToNextQuestion={goToNextQuestion}
                timeToAnswer={timeToAnswer}
              />
            ))}
            {/* {rd} */}
          </Gallery>
        </div>
      )
        : <ScreenSpinner />}

      {/*      <Div className="Work--subTitle">
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
            correctAnswer: currentQuestion.correctAnswer,
            explanation: currentQuestion.explanation,
          }}
          time={time}
          onComplete={onCompleteQuestion}
        />
      ) : <Spinner size="large" />)} */}

    </Panel>
  );
};

WorkGallery.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
};
WorkGallery.defaultProps = {};
export default WorkGallery;
