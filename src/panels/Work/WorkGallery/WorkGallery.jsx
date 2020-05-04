import React, { useEffect, useState } from 'react';
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
  const timeToAnswer = 10;
  const dispatch = useDispatch();

  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [activeModal, setActiveModal] = useState('Work--readyCheck');
  const [result, setResult] = useState([]);
  const [rd, setRd] = useState([]);

  // Первое получение всех вопросов
  useEffect(() => {
    setTimeout(() => {
      const resultFromServer = [
        {
          question: 'Что кричал Волк Зайцу в известном мультфильме времён СССР?',
          answers: ['Ну, догоню!', 'Ну, погоди!', 'Ну, попробуй!', 'Ну, что народ, погнали?!'],
          correctAnswer: 'Ну, погоди!',
          correctAnswerNumber: 1,
          explanation: '«Ну, заяц, погоди!», — кричал знаменитый персонаж Союз Мультфильма. '
            + 'Интересно, что цитата стала весьма популярной у взрослых.',
          theme: 'Детский',
        },
        {
          question: 'Буга вуга?',
          answers: ['Дирижабль, ага!', 'Fuuu', 'Ра-та-та-та!', 'Конечно'],
          correctAnswer: 'Дирижабль, ага!',
          correctAnswerNumber: 1,
          explanation: '«Ну, заяц, погоди!», — кричал знаменитый персонаж Союз Мультфильма. '
            + 'Интересно, что цитата стала весьма популярной у взрослых.',
          theme: 'Рофел',
        },
        {
          question: 'Металл, вызывающий лихорадку?',
          answers: ['Золото', 'Серебро', 'Вибраниум', 'Медь'],
          correctAnswer: 'Золото',
          correctAnswerNumber: 0,
          explanation: '«Ну, заяц, погоди!», — кричал знаменитый персонаж Союз Мультфильма. '
            + 'Интересно, что цитата стала весьма популярной у взрослых.',
          theme: 'Химия',
        },
      ];
      setQuestions(resultFromServer);
    }, 1000);

    return () => {
      setQuestions([]);
      setQuestionIndex(0);
      setActiveModal('Work--readyCheck');
      setResult([]);
    };
  }, []);

  // Отправка результата квиза в Redux
  useEffect(() => {
    dispatch({
      type: 'UPDATE_QUIZ_RESULT',
      payload: result,
    });

    if (questions.length) {
      // При проверке условия вычитаем первый (проверочный) вопрос
      if (result.length === questions.length - 1) {
        setActivePanel('QuizResultPanel');
      }
    }
  }, [result]);


/*  useEffect(() => {
    const rendered = questions.map((item, index) => (
      <WorkGalleryPanel
        key={Math.random()}
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
        goToNextQuestion={setQuestionIndex}
        timeToAnswer={timeToAnswer}
      />
    ));
    setRd(rendered);
  }, [questions]);*/

  return (
    <Panel id={id} className="Work" centered={!questions.length}>
      <PanelHeader>
        Самостоялка
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
                key={'WorkGalleryPanel_' + index}
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
                goToNextQuestion={setQuestionIndex}
                timeToAnswer={timeToAnswer}
              />
            ))}
            {/*{rd}*/}
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
