import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import './shopQuestion.css';
import {
  Button,
  Div,
  FormLayout,
  FormLayoutGroup,
  Group,
  Input,
  IOS,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  ScreenSpinner,
  Textarea,
  usePlatform,
  View,
} from '@vkontakte/vkui';
import Icon56CheckCircleOutline from '@vkontakte/icons/dist/56/check_circle_outline';
import Icon28CancelCircleOutline from '@vkontakte/icons/dist/28/cancel_circle_outline';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import bridge from '@vkontakte/vk-bridge';
import globalVariables from '../../../GlobalVariables';

const ShopQuestion = (props) => {
  const resultTypeOptions = {
    accepted: 'accepted',
    rejected: 'rejected',
    alreadyExist: 'alreadyExist',
  };
  const { id, questionData, setActivePanel } = props;

  const dispatch = useDispatch();
  const userBalance = useSelector((state) => state.userInfo.coins.overall);
  const userToken = useSelector((state) => state.userToken.token);

  const controlHardwareBackButton = useCallback(() => {
      setActivePanel(globalVariables.commonView.panels.shop);
  }, []);
  useEffect(() => {
    // Алгоритм для обработки аппаратной кнопки "Назад" на андроидах
    window.history.pushState({ page: 'ShopQuestion' }, 'ShopQuestion', `${window.location.search}`);
    window.addEventListener('popstate', controlHardwareBackButton);
    return () => {
      window.removeEventListener('popstate', controlHardwareBackButton);
    };
  }, []);

  const inputPlaceholders = {
    Math: {
      question: 'Что извлекают математики?',
      answers: [
        'Корень', 'Выгоду', 'Пулю', 'Диск',
      ],
    },
    Russian: {
      question: 'Какого падежа не существует?',
      answers: [
        'Склонительного', 'Дательного', 'Предложного', 'Иминительного',
      ],
    },
    Literature: {
      question: 'Кто был М. Булгаков?',
      answers: [
        'Писатель', 'Математика', 'Физик', 'Химик',
      ],
    },
    Physics: {
      question: 'В чем измеряют напряжение?',
      answers: [
        'Вольты', 'Амперы', 'Моли', 'Джоули',
      ],
    },
    Chemistry: {
      question: 'Что открыл Менделеев?',
      answers: [
        'Водку', 'Закон всемирного тяготения', 'Дверь', 'Окно',
      ],
    },
    Astronomy: {
      question: 'В какой системе находится Земля?',
      answers: [
        'Солнечная', 'Млечная', 'Мрачная', 'Яркая',
      ],
    },
    Biology: {
      question: 'На кого похож человек?',
      answers: [
        'Обезьяна', 'Слон', 'Жираф', 'Собака',
      ],
    },
    History: {
      question: 'Когда отмечают День Конституции РФ?',
      answers: [
        '12 декабря', '10 января', '11 апреля', '21 декабря',
      ],
    },
    Art: {
      question: 'Кто нарисовал чёрный квадрат?',
      answers: [
        'Малевич', 'Пикассо', 'Шишкин', 'Васнецов',
      ],
    },
    Sport: {
      question: 'Фамилия российского футбольного комментатора?',
      answers: [
        'Уткин', 'Коршунов', 'Голубев', 'Белкин',
      ],
    },
    Other: {
      question: 'Кем был Гарри Поттер?',
      answers: [
        'Волшебником', 'Учёным', 'Детективом', 'Космонавтом',
      ],
    },
    Geography: {
      question: 'Столица Канады?',
      answers: [
        'Торонто', 'Сингапур', 'Мехико', 'Рио-Де-Жанейро',
      ],
    },
  };
  const maxSymbolsInInput = {
    question: 300,
    answers: [128, 128, 128, 128],
    explanation: 300,
  };
  const [symbolCounter, setSymbolCounter] = useState({
    question: maxSymbolsInInput.question,
    answers: [
      maxSymbolsInInput.answers[0],
      maxSymbolsInInput.answers[1],
      maxSymbolsInInput.answers[2],
      maxSymbolsInInput.answers[3],
    ],
    explanation: maxSymbolsInInput.explanation,
  });

  const refQuestionText = useRef(null);
  const refQuestionCorrectAnswer = useRef(null);
  const refQuestionIncorrectAnswer1 = useRef(null);
  const refQuestionIncorrectAnswer2 = useRef(null);
  const refQuestionIncorrectAnswer3 = useRef(null);

  const [emptyInput, setEmptyInput] = useState({
    input0: false,
    input1: false,
    input2: false,
    input3: false,
    input4: false,
  });

  const [checkingProgress, setCheckingProgress] = useState(false);
  const [activeSubviewPanel, setActiveSubviewPanel] = useState('ShopQuestionSubview-makeQuestion');
  const [resultType, setResultType] = useState(''); // accepted, rejected, alreadyExist
  const [savedUserQuestion, setSavedUserQuestion] = useState({
    text: '',
    answers: ['', '', '', ''],
    explanation: '',
    category: questionData.category,
    correctAnswer: 0,
    cost: questionData.price,
  });
  const platform = usePlatform();
  useEffect(() => {
    if (resultType) {
      if (resultType === 'accepted') {
        bridge.send('VKWebAppTapticNotificationOccurred', { type: 'success' });
      } else bridge.send('VKWebAppTapticNotificationOccurred', { type: 'error' });
    }
  }, [resultType]);

  useEffect(() => {
    if (activeSubviewPanel === 'ShopQuestionSubview-makeQuestion') {
      setResultType('');
    }
  }, [activeSubviewPanel]);

  useEffect(() => {
    if (resultType) {
      setCheckingProgress(false);
      if (resultType !== resultTypeOptions.alreadyExist) {
        setActiveSubviewPanel('ShopQuestionSubview-result');
      }
    }
  }, [resultType, resultTypeOptions.alreadyExist]);

  function sendQuestion() {
    let canSend = true;
    if (!refQuestionText.current.value) {
      canSend = false;
      setEmptyInput((prevState) => ({ ...prevState, ...{ input0: true } }));
    }
    if (refQuestionText.current.value.length > maxSymbolsInInput.question) canSend = false;

    if (!refQuestionCorrectAnswer.current.value) {
      canSend = false;
      setEmptyInput((prevState) => ({ ...prevState, ...{ input1: true } }));
    }
    if (refQuestionCorrectAnswer.current.value.length > maxSymbolsInInput.answers[0]) canSend = false;

    if (!refQuestionIncorrectAnswer1.current.value) {
      canSend = false;
      setEmptyInput((prevState) => ({ ...prevState, ...{ input2: true } }));
    }
    if (refQuestionIncorrectAnswer1.current.value.length > maxSymbolsInInput.answers[1]) canSend = false;

    if (!refQuestionIncorrectAnswer2.current.value) {
      canSend = false;
      setEmptyInput((prevState) => ({ ...prevState, ...{ input3: true } }));
    }
    if (refQuestionIncorrectAnswer2.current.value.length > maxSymbolsInInput.answers[2]) { canSend = false; }

    if (!refQuestionIncorrectAnswer3.current.value) {
      canSend = false;
      setEmptyInput((prevState) => ({ ...prevState, ...{ input4: true } }));
    }
    if (refQuestionIncorrectAnswer3.current.value.length > maxSymbolsInInput.answers[3]) canSend = false;

    if (!canSend) return;
    setCheckingProgress(true);
    // Отсылаем вопрос на сервер

    const urlParams = new URLSearchParams(window.location.search);

    if (userToken) {
      const data = {
        text: savedUserQuestion.text,
        answers: savedUserQuestion.answers,
        category: questionData.category,
      };
      if (savedUserQuestion.explanation) data.explanation = savedUserQuestion.explanation;
      axios.post(`${globalVariables.serverURL}/api/buy/question`, data, {
        params: {
          token: userToken,
          id: urlParams.get('vk_user_id'),
        },
        headers: {
          'X-Access-Token': userToken,
        },
      })
        .then(() => {
          setResultType(resultTypeOptions.accepted);
          dispatch({
            type: 'UPDATE_USER_INFO',
            payload: {
              coins: {
                overall: userBalance - questionData.price,
              },
            },
          });
          setSavedUserQuestion({
            text: '',
            answers: [
              '',
              '',
              '',
              '',
            ],
            category: questionData.category,
            correctAnswer: 0,
            cost: questionData.price,
          });
          setSymbolCounter({
            question: maxSymbolsInInput.question,
            answers: [
              maxSymbolsInInput.answers[0],
              maxSymbolsInInput.answers[1],
              maxSymbolsInInput.answers[2],
              maxSymbolsInInput.answers[3],
            ],
            explanation: maxSymbolsInInput.explanation,
          });
        })
        .catch((err) => {
          console.error('Main, get/getCategoriesState', err);
          console.error(err.response.status);
          setCheckingProgress(false);

          if (err.response.status === 403) {
            // Не хватает монет
          } else if (err.response.status === 500) {
            // Уже зарегистрирован
            setResultType('alreadyExist');
          } else {
            setResultType(resultTypeOptions.rejected);
          }
        });
    } else {
      // Перемещение на стартовый экран
    }
  }

  return (
    <Panel
      id={id}
      className="ShopQuestion"
    >
      <View
        activePanel={activeSubviewPanel}
        popout={(checkingProgress && <ScreenSpinner />)}
      >
        <Panel
          id="ShopQuestionSubview-makeQuestion"
          className="ShopQuestion__Subview"
        >
          <PanelHeader
            left={(
              <PanelHeaderBack
                label={(platform === IOS && 'Назад')}
                onClick={() => setActivePanel('Shop')}
              />
            )}
          >
            {globalVariables.translateEnToRu(questionData.category)}
          </PanelHeader>

          <Group
            description="Ваш вопрос будет проверен администрацией Мозгополии. Обычно проверка занимает не более одного дня."
          >
            <FormLayout className="ShopQuestion--form">
              <Textarea
                top="Вопрос"
                placeholder={`Например, «${inputPlaceholders[questionData.category].question}»`}
                getRef={refQuestionText}
                status={((resultType === resultTypeOptions.alreadyExist) || emptyInput.input0 || symbolCounter.question < 0) && 'error'}
                bottom={(resultType === resultTypeOptions.alreadyExist)
                  ? 'К сожалению, этот вопрос уже зарегистрирован кем-то другим.'
                  : (symbolCounter.question >= 0 ? `Осталось символов: ${symbolCounter.question}` : `Вопрос не может содержать более ${maxSymbolsInInput.question} символов`)}
                value={savedUserQuestion.text}
                onChange={(e) => {
                  setSymbolCounter(
                    (prevState) => (
                      {
                        ...prevState,
                        ...{ question: maxSymbolsInInput.question - e.target.value.length },
                      }),
                  );
                  setSavedUserQuestion({ ...savedUserQuestion, ...{ text: e.target.value } });
                  if (resultType === resultTypeOptions.alreadyExist) {
                    setResultType('');
                  }
                  setEmptyInput((prevState) => ({ ...prevState, ...{ input0: false } }));
                }}
              />

              <FormLayoutGroup
                top="Правильный ответ"
                className="ShopQuestion--correctAnswer"
                status={((symbolCounter.answers[0] < 0) || emptyInput.input1) && 'error'}
                bottom={(symbolCounter.answers[0] >= 0 ? `Осталось символов: ${symbolCounter.answers[0]}` : `Ответ не может содержать более ${maxSymbolsInInput.answers[0]} символов`)}
              >
                <Input
                  type="text"
                  placeholder={inputPlaceholders[questionData.category].answers[0]}
                  getRef={refQuestionCorrectAnswer}
                  value={savedUserQuestion.answers[0]}
                  status={((symbolCounter.answers[0] < 0) || emptyInput.input1) && 'error'}
                  onChange={(e) => {
                    const answersTemp = savedUserQuestion.answers;
                    answersTemp[0] = e.target.value;
                    setSavedUserQuestion({ ...savedUserQuestion, ...{ answers: answersTemp } });
                    setEmptyInput((prevState) => ({ ...prevState, ...{ input1: false } }));

                    const tempCounter = symbolCounter.answers;
                    tempCounter[0] = maxSymbolsInInput.answers[0] - e.target.value.length;
                    setSymbolCounter(
                      (prevState) => (
                        {
                          ...prevState,
                          ...{ answers: tempCounter },
                        }),
                    );
                  }}

                />
              </FormLayoutGroup>

              <Input
                top={(
                  <div className="ShopQuestion--incorrectAnswers_input-top">
                    Неправильные
                    ответы
                  </div>
)}
                type="text"
                placeholder={inputPlaceholders[questionData.category].answers[1]}
                className="ShopQuestion--incorrectAnswers_input"
                status={((symbolCounter.answers[1] < 0) || emptyInput.input2) && 'error'}
                bottom={(symbolCounter.answers[1] < 0 && `Ответ не может содержать более ${maxSymbolsInInput.answers[1]} символов`)}

                getRef={refQuestionIncorrectAnswer1}
                value={savedUserQuestion.answers[1]}
                onChange={(e) => {
                  const answersTemp = savedUserQuestion.answers;
                  answersTemp[1] = e.target.value;
                  setSavedUserQuestion({ ...savedUserQuestion, ...{ answers: answersTemp } });
                  setEmptyInput((prevState) => ({ ...prevState, ...{ input2: false } }));

                  const tempCounter = symbolCounter.answers;
                  tempCounter[1] = maxSymbolsInInput.answers[1] - e.target.value.length;
                  setSymbolCounter(
                    (prevState) => (
                      {
                        ...prevState,
                        ...{ answers: tempCounter },
                      }),
                  );
                }}
              />
              <Input
                type="text"
                placeholder={inputPlaceholders[questionData.category].answers[2]}
                className="ShopQuestion--incorrectAnswers_input"
                getRef={refQuestionIncorrectAnswer2}
                value={savedUserQuestion.answers[2]}
                status={((symbolCounter.answers[2] < 0) || emptyInput.input3) && 'error'}
                bottom={(symbolCounter.answers[2] < 0 && `Ответ не может содержать более ${maxSymbolsInInput.answers[2]} символов`)}
                onChange={(e) => {
                  const answersTemp = savedUserQuestion.answers;
                  answersTemp[2] = e.target.value;
                  setSavedUserQuestion({ ...savedUserQuestion, ...{ answers: answersTemp } });
                  setEmptyInput((prevState) => ({ ...prevState, ...{ input3: false } }));

                  const tempCounter = symbolCounter.answers;
                  tempCounter[2] = maxSymbolsInInput.answers[2] - e.target.value.length;
                  setSymbolCounter(
                    (prevState) => (
                      {
                        ...prevState,
                        ...{ answers: tempCounter },
                      }),
                  );
                }}
              />
              <Input
                type="text"
                placeholder={inputPlaceholders[questionData.category].answers[3]}
                className="ShopQuestion--incorrectAnswers_input"
                getRef={refQuestionIncorrectAnswer3}
                value={savedUserQuestion.answers[3]}
                status={((symbolCounter.answers[3] < 0) || emptyInput.input4) && 'error'}
                bottom={(symbolCounter.answers[3] < 0 && `Ответ не может содержать более ${maxSymbolsInInput.answers[3]} символов`)}

                onChange={(e) => {
                  const answersTemp = savedUserQuestion.answers;
                  answersTemp[3] = e.target.value;
                  setSavedUserQuestion({ ...savedUserQuestion, ...{ answers: answersTemp } });
                  setEmptyInput((prevState) => ({ ...prevState, ...{ input4: false } }));

                  const tempCounter = symbolCounter.answers;
                  tempCounter[3] = maxSymbolsInInput.answers[3] - e.target.value.length;
                  setSymbolCounter(
                    (prevState) => (
                      {
                        ...prevState,
                        ...{ answers: tempCounter },
                      }),
                  );
                }}
              />

              <Textarea
                top="Пояснение (+5 GP)"
                placeholder="Введите текст пояснения для Вашего вопроса"
                value={savedUserQuestion.explanation}
                status={(symbolCounter.explanation < 0) && 'error'}
                bottom={(symbolCounter.explanation >= 0 ? `Осталось символов: ${symbolCounter.explanation}` : `Пояснение не может содержать более ${maxSymbolsInInput.explanation} символов`)}

                onChange={(e) => {
                  setSavedUserQuestion({
                    ...savedUserQuestion,
                    ...{ explanation: e.target.value },
                  });
                  const tempCount = maxSymbolsInInput.explanation - e.target.value.length;
                  setSymbolCounter(
                    (prevState) => (
                      {
                        ...prevState,
                        ...{ explanation: tempCount },
                      }),
                  );
                }}
              />
            </FormLayout>
            <Div>
              <Button
                mode="commerce"
                size="xl"
                onClick={() => {
                  // setUndef();

                  sendQuestion();
                }}
              >
                {`Купить за ${questionData.price} монет`}
              </Button>
            </Div>
          </Group>
        </Panel>


        {/*= ================== */}

        <Panel id="ShopQuestionSubview-result">
          <PanelHeader
            left={(
              <PanelHeaderBack
                label={(platform === IOS && 'Назад')}
                onClick={() => setActiveSubviewPanel('ShopQuestionSubview-makeQuestion')}
              />
            )}
          >
            {globalVariables.translateEnToRu(questionData.category)}
          </PanelHeader>
          <Group>
            {(resultType === resultTypeOptions.accepted) && (
              <Placeholder
                className="ShopQuestion--placeholder"
                icon={(
                  <Icon56CheckCircleOutline
                    className="ShopQuestion--placeholder__icon-accepted"
                    height={64}
                    width={64}
                  />
                )}
                action={(
                  <div>
                    <Button
                      className="ShopQuestion--placeholder__button"
                      mode="secondary"
                      onClick={() => {
                        setActivePanel('Shop');
                      }}
                    >
                      В магазин
                    </Button>
                    <Button
                      className="ShopQuestion--placeholder__button"
                      mode="primary"
                      onClick={() => {
                        setResultType('');
                        setActiveSubviewPanel('ShopQuestionSubview-makeQuestion');
                      }}
                    >
                      Купить еще
                    </Button>
                  </div>
                )}
              >
                Ваш вопрос успешно зарегистрирован и проходит модерацию.
              </Placeholder>
            )}

            {(resultType === resultTypeOptions.rejected) && (
              <Placeholder
                className="ShopQuestion--placeholder"
                icon={(
                  <Icon28CancelCircleOutline
                    className="ShopQuestion--placeholder__icon-rejected"
                    height={64}
                    width={64}
                  />
                )}
                action={(
                  <div>
                    <Button
                      className="ShopQuestion--placeholder__button"
                      mode="secondary"
                      onClick={() => {
                        setResultType('');
                        sendQuestion(savedUserQuestion);
                      }}
                    >
                      Повторить
                    </Button>
                  </div>
                )}
              >
                Не удалось зарегистрировать вопрос. Произошла непредвиденная ошибка.
              </Placeholder>
            )}
          </Group>
        </Panel>
      </View>

    </Panel>
  );
};

ShopQuestion.propTypes = {
  id: PropTypes.string.isRequired,
  questionData: PropTypes.shape({
    category: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  setActivePanel: PropTypes.func.isRequired,
};
ShopQuestion.defaultProps = {};
export default ShopQuestion;
