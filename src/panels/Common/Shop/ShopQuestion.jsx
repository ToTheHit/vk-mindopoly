import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './shopQuestion.css';
import {
  Button, Div,
  FormLayout, FormLayoutGroup, Group, Input,
  IOS, Panel, PanelHeader, PanelHeaderBack, Placeholder, ScreenSpinner, Textarea, usePlatform, View,
} from '@vkontakte/vkui';
import Icon56CheckCircleOutline from '@vkontakte/icons/dist/56/check_circle_outline';
import Icon28CancelCircleOutline from '@vkontakte/icons/dist/28/cancel_circle_outline';
import globalVariables from '../../../GlobalVariables';

const ShopQuestion = (props) => {
  const resultTypeOptions = {
    accepted: 'accepted',
    rejected: 'rejected',
    alreadyExist: 'alreadyExist',
  };
  const { id, questionData, setActivePanel } = props;

  const refQuestionText = useRef(null);
  const refQuestionCorrectAnswer = useRef(null);
  const refQuestionIncorrectAnswer1 = useRef(null);
  const refQuestionIncorrectAnswer2 = useRef(null);
  const refQuestionIncorrectAnswer3 = useRef(null);

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
    category: questionData.category,
    correctAnswer: 0,
    cost: questionData.cost,
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
  }, [resultType]);


  function sendQuestion() {
    console.log(savedUserQuestion);
    setCheckingProgress(true);

    // Отсылаем вопрос на сервер
    setTimeout(() => {
      setResultType(resultTypeOptions.rejected);
    }, 1000);
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
                placeholder="Введите текст Вашего вопроса"
                getRef={refQuestionText}
                status={(resultType === resultTypeOptions.alreadyExist) && 'error'}
                bottom={(resultType === resultTypeOptions.alreadyExist) && 'К сожалению, этот вопрос уже зарегистрирован кем-то другим.'}
                value={savedUserQuestion.text}
                onChange={(e) => {
                  setSavedUserQuestion({ ...savedUserQuestion, ...{ text: e.target.value } });
                  if (resultType === resultTypeOptions.alreadyExist) { setResultType(''); }
                }}
              />

              <FormLayoutGroup top="Правильный ответ" className="ShopQuestion--correctAnswer">
                <Input
                  type="text"
                  getRef={refQuestionCorrectAnswer}
                  value={savedUserQuestion.answers[0]}
                  onChange={(e) => {
                    const answersTemp = savedUserQuestion.answers;
                    answersTemp[0] = e.target.value;
                    setSavedUserQuestion({ ...savedUserQuestion, ...{ answers: answersTemp } });
                  }}
                />
              </FormLayoutGroup>

              <FormLayoutGroup top="Неправильные ответы" className="ShopQuestion--badAnswer">
                <Input
                  type="text"
                  className="ShopQuestion--incorrectAnswer_input"
                  getRef={refQuestionIncorrectAnswer1}
                  value={savedUserQuestion.answers[1]}
                  onChange={(e) => {
                    const answersTemp = savedUserQuestion.answers;
                    answersTemp[1] = e.target.value;
                    setSavedUserQuestion({ ...savedUserQuestion, ...{ answers: answersTemp } });
                  }}
                />
                <Input
                  type="text"
                  className="ShopQuestion--incorrectAnswer_input"
                  getRef={refQuestionIncorrectAnswer2}
                  value={savedUserQuestion.answers[2]}
                  onChange={(e) => {
                    const answersTemp = savedUserQuestion.answers;
                    answersTemp[2] = e.target.value;
                    setSavedUserQuestion({ ...savedUserQuestion, ...{ answers: answersTemp } });
                  }}
                />
                <Input
                  type="text"
                  className="ShopQuestion--incorrectAnswer_input"
                  getRef={refQuestionIncorrectAnswer3}
                  value={savedUserQuestion.answers[3]}
                  onChange={(e) => {
                    const answersTemp = savedUserQuestion.answers;
                    answersTemp[3] = e.target.value;
                    setSavedUserQuestion({ ...savedUserQuestion, ...{ answers: answersTemp } });
                  }}
                />
              </FormLayoutGroup>
            </FormLayout>
            <Div>
              <Button
                mode="commerce"
                size="xl"
                onClick={() => sendQuestion()}
              >
                {`Купить за ${questionData.cost} марок`}
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
                    onClick={() => {}}
                  >
                    В магазин
                  </Button>
                  <Button
                    className="ShopQuestion--placeholder__button"
                    mode="primary"
                    onClick={() => {}}
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
                    onClick={() => { setResultType(''); sendQuestion(savedUserQuestion); }}
                  >
                    Повторить
                  </Button>
                </div>
              )}
            >
              Не удалось зарегистрировать вопрос. Произошла непредвиденная ошибка.
            </Placeholder>
          )}

        </Panel>
      </View>

    </Panel>
  );
};

ShopQuestion.propTypes = {
  id: PropTypes.string.isRequired,
  questionData: PropTypes.shape({
    category: PropTypes.string,
    cost: PropTypes.number,
  }).isRequired,
  setActivePanel: PropTypes.func.isRequired,

};
ShopQuestion.defaultProps = {};
export default ShopQuestion;
