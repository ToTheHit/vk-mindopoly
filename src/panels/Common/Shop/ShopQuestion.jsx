import React, { useEffect, useRef, useState } from 'react';
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
import bridge from '@vkontakte/vk-bridge';
import axios from 'axios';
import globalVariables from '../../../GlobalVariables';

const ShopQuestion = (props) => {
  const resultTypeOptions = {
    accepted: 'accepted',
    rejected: 'rejected',
    alreadyExist: 'alreadyExist',
  };
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
        'Уткин', 'Гусев', 'Голубев', 'Белкин',
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
  const { id, questionData, setActivePanel } = props;

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
    answers: [
      '',
      '',
      '',
      '',
    ],
    explanation: '',
    category: questionData.category,
    correctAnswer: 0,
    cost: questionData.price,
  });
  const platform = usePlatform();

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
    if (!refQuestionText.current.value) { canSend = false; setEmptyInput((prevState) => ({ ...prevState, ...{ input0: true } })); }
    if (!refQuestionCorrectAnswer.current.value) { canSend = false; setEmptyInput((prevState) => ({ ...prevState, ...{ input1: true } })); }
    if (!refQuestionIncorrectAnswer1.current.value) { canSend = false; setEmptyInput((prevState) => ({ ...prevState, ...{ input2: true } })); }
    if (!refQuestionIncorrectAnswer2.current.value) { canSend = false; setEmptyInput((prevState) => ({ ...prevState, ...{ input3: true } })); }
    if (!refQuestionIncorrectAnswer3.current.value) { canSend = false; setEmptyInput((prevState) => ({ ...prevState, ...{ input4: true } })); }

    if (!canSend) return;
    setCheckingProgress(true);
    // Отсылаем вопрос на сервер
    bridge.send('VKWebAppStorageGet', { keys: [globalVariables.authToken] })
      .then(((bridgeData) => {
        const urlParams = new URLSearchParams(window.location.search);

        if (bridgeData.keys[0].value) {
          axios.post(`${globalVariables.serverURL}/api/buy/question`, {
            text: savedUserQuestion.text,
            answers: savedUserQuestion.answers,
            explanation: savedUserQuestion.explanation,
            category: questionData.category,
          }, {
            params: {
              token: bridgeData.keys[0].value,
              id: urlParams.get('vk_user_id'),
            },
          })
            .then(() => {
              setResultType(resultTypeOptions.accepted);
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
            })
            .catch((err) => {
              console.info('Main, get/getCategoriesState', err);
              console.info(err.response.status);
              setCheckingProgress(false);

              if (err.response.status === 403) {
                // Не хватает монет
              } else if (500) {
                // Уже зарегистрирован
                setResultType('alreadyExist');
              } else {
                setResultType(resultTypeOptions.rejected);
              }
            });
        } else {
          // Перемещение на стартовый экран
        }
      }));
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
        <Panel id="ShopQuestionSubview-makeQuestion">
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
            <FormLayout>
              <Textarea
                top="Вопрос"
                placeholder={`Например, «${inputPlaceholders[questionData.category].question}»`}
                getRef={refQuestionText}
                status={((resultType === resultTypeOptions.alreadyExist) || emptyInput.input0) && 'error'}
                bottom={(resultType === resultTypeOptions.alreadyExist) && 'К сожалению, этот вопрос уже зарегистрирован кем-то другим.'}
                value={savedUserQuestion.text}
                onChange={(e) => {
                  setSavedUserQuestion({ ...savedUserQuestion, ...{ text: e.target.value } });
                  if (resultType === resultTypeOptions.alreadyExist) {
                    setResultType('');
                  }
                  setEmptyInput((prevState) => ({ ...prevState, ...{ input0: false } }));
                }}
              />

              <FormLayoutGroup top="Правильный ответ" className="ShopQuestion--correctAnswer">
                <Input
                  type="text"
                  placeholder={inputPlaceholders[questionData.category].answers[0]}
                  getRef={refQuestionCorrectAnswer}
                  value={savedUserQuestion.answers[0]}
                  status={(emptyInput.input1 && 'error')}
                  onChange={(e) => {
                    const answersTemp = savedUserQuestion.answers;
                    answersTemp[0] = e.target.value;
                    setSavedUserQuestion({ ...savedUserQuestion, ...{ answers: answersTemp } });
                    setEmptyInput((prevState) => ({ ...prevState, ...{ input1: false } }));
                  }}
                />
              </FormLayoutGroup>

              <FormLayoutGroup top="Неправильные ответы" className="ShopQuestion--badAnswer">
                <Input
                  type="text"
                  placeholder={inputPlaceholders[questionData.category].answers[1]}
                  className="ShopQuestion--incorrectAnswer_input"
                  getRef={refQuestionIncorrectAnswer1}
                  value={savedUserQuestion.answers[1]}
                  status={(emptyInput.input2 && 'error')}
                  onChange={(e) => {
                    const answersTemp = savedUserQuestion.answers;
                    answersTemp[1] = e.target.value;
                    setSavedUserQuestion({ ...savedUserQuestion, ...{ answers: answersTemp } });
                    setEmptyInput((prevState) => ({ ...prevState, ...{ input2: false } }));
                  }}
                />
                <Input
                  type="text"
                  placeholder={inputPlaceholders[questionData.category].answers[2]}
                  className="ShopQuestion--incorrectAnswer_input"
                  getRef={refQuestionIncorrectAnswer2}
                  value={savedUserQuestion.answers[2]}
                  status={(emptyInput.input3 && 'error')}
                  onChange={(e) => {
                    const answersTemp = savedUserQuestion.answers;
                    answersTemp[2] = e.target.value;
                    setSavedUserQuestion({ ...savedUserQuestion, ...{ answers: answersTemp } });
                    setEmptyInput((prevState) => ({ ...prevState, ...{ input3: false } }));
                  }}
                />
                <Input
                  type="text"
                  placeholder={inputPlaceholders[questionData.category].answers[3]}
                  className="ShopQuestion--incorrectAnswer_input"
                  getRef={refQuestionIncorrectAnswer3}
                  value={savedUserQuestion.answers[3]}
                  status={(emptyInput.input4 && 'error')}
                  onChange={(e) => {
                    const answersTemp = savedUserQuestion.answers;
                    answersTemp[3] = e.target.value;
                    setSavedUserQuestion({ ...savedUserQuestion, ...{ answers: answersTemp } });
                    setEmptyInput((prevState) => ({ ...prevState, ...{ input4: false } }));
                  }}
                />

              </FormLayoutGroup>
              <Textarea
                top="Пояснение"
                placeholder="Введите текст пояснения для Вашего вопроса"
                value={savedUserQuestion.explanation}
                onChange={(e) => {
                  setSavedUserQuestion({
                    ...savedUserQuestion,
                    ...{ explanation: e.target.value },
                  });
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
