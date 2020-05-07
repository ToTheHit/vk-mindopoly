import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Card,
  Cell,
  Div,
  Group,
  Header,
  Headline,
  Panel,
  PanelHeader,
  Separator,
  SimpleCell, Spinner,
  Text,
  Subhead, ScreenSpinner, Title,
} from '@vkontakte/vkui';

import './common.css';
import bridge from '@vkontakte/vk-bridge';
import BrainLeaderboard from './BrainLeaderboard';
import MyQuestionGallery from './Components/MyQuestionGallery/MyQuestionGallery';
import Icon32Coins from '../../assets/Quiz/icn32_coins.png';
import Icon32Genius from '../../assets/Quiz/icn32_genius.png';
import Mindbreakers from './Components/Mindbrakers/Mindbreakers';

const Common = (props) => {
  const { id, setActivePanel } = props;
  const [showScreen, setShowScreen] = useState(false);
  const [quizCard, setQuizCard] = useState({
    completed: false, date: '25 апреля', trueAnswers: 3, questionsCount: 5,
  });
  const [renderedFacts, setRenderedFacts] = useState([]);
  const [facts, setFacts] = useState([]);
  const [myQuestions, setMyQuestions] = useState([]);
  const [VKuser, setVKuser] = useState({
    first_name: 'Test',
    last_name: 'User',
    photo_200: 'https://vk.com/images/deactivated_100.png?ava=1',
    BP: 62,
    coins: 15,
    worldPlace: 12803312,
    friendsPlace: 4,
  });

  useEffect(() => {
    bridge
      .send('VKWebAppGetUserInfo')
      .then((data) => {
        setVKuser({ ...VKuser, ...data });
        setShowScreen(true);
      });
    setFacts([
      {
        question: 'Какая птица не подкладывает свои яйца в чужие гнёзда?',
        answer: 'Золотистая ржанка',
      },
      {
        question: 'В каком из этих напитков, по мнению дегустаторов, преобладает оттенок корочки ржаного хлеба?',
        answer: 'В Токае',
      },
      {
        question: 'Из чьей шерсти первоначально делались камилавки: головные уборы византийских священников?',
        answer: 'Верблюд',
      },
    ]);
    setMyQuestions([
      {
        question: 'Какой из этих металлов вызывает лихорадку?',
        answers: ['1', '2', '3', '4'],
        cost: 32,
      },
      {
        question: 'Какой из этих металлов вызывает лихорадку? Какой из этих металлов вызывает лихорадку?',
        answers: ['1', '2', '3', '4'],
        cost: 32,
      },
      {
        question: 'Какой из этих металлов вызывает лихорадку?',
        answers: ['1', '2', '3', '4'],
        cost: 32,
      },
      {
        question: 'Какой из этих металлов вызывает лихорадку?',
        answers: ['1', '2', '3', '4'],
        cost: 32,
      },
    ]);

    // TODO: Для разработки. Удалить для релиза
    setTimeout(() => {
      setShowScreen(true);
    }, 1000);
  }, []);

  useEffect(() => {
    const renderedItems = facts.map((item) => (
      <Cell key={item.question} description={item.answer} multiline>{item.question}</Cell>
    ));
    setRenderedFacts(renderedItems);
  }, [facts]);


  return (
    <Panel id={id} className="Common" centered={!showScreen}>
      <PanelHeader>
        Мозгополия
      </PanelHeader>
      {!showScreen && <ScreenSpinner />}

      {/* Quiz card */}
      {showScreen && (
        <div>
          <div className="Common--balance">
            <Text className="Common--balance__title">ваш баланс</Text>
            <div className="Common--balance__row">
              <div className="Common--balance__item">
                <div style={{ backgroundImage: `url(${Icon32Coins})` }} className="Common--balance__icon" />
                <Title
                  level="1"
                  className="Common--GPcounter"
                >
                  {VKuser.coins}
                </Title>
                <Title
                  level="1"
                  className="Common--GPcounter_currency"
                >
                  M
                </Title>
              </div>
              <div className="Common--balance__item">
                <div style={{ backgroundImage: `url(${Icon32Genius})` }} className="Common--balance__icon" />
                <Title
                  level="1"
                  className="Common--GPcounter"
                >
                  {VKuser.BP}
                </Title>
                <Title
                  level="1"
                  className="Common--GPcounter_currency"
                >
                  BP
                </Title>
              </div>
            </div>

          </div>


          <div>
            {quizCard && (
            <Div style={{ paddingBottom: 0 }}>
              <Card size="l">
                <Div
                  className="Common--quizCard"
                >
                  <div className="Common__iconQuiz">
                    <svg width="21px" height="21px" viewBox="0 0 21 21">
                      <defs>
                        <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="44.8671592%" id="radialGradient-1">
                          <stop stopColor="#FFD54F" offset="0%" />
                          <stop stopColor="#FFA000" offset="100%" />
                        </radialGradient>
                      </defs>
                      <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="QuizCard" transform="translate(-12.000000, -10.000000)">
                          <g id="icn32/coin" transform="translate(12.000000, 10.000000)">
                            <g id="icn32_quiz">
                              <circle id="Oval" stroke="#FFD54F" strokeWidth="2" fill="url(#radialGradient-1)" fillRule="nonzero" cx="10.5" cy="10.5" r="9.5" />
                              <polygon id="Star" fill="#FFEBA9" points="10.5 13.7219587 6.97328849 15.354102 7.43573518 11.49564 4.7936609 8.64589803 8.60618019 7.89338065 10.5 4.5 12.3938198 7.89338065 16.2063391 8.64589803 13.5642648 11.49564 14.0267115 15.354102" />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>

                  {(quizCard.completed && (
                    <Cell
                      multiline
                      description={
                        `Вы ответили на ${quizCard.trueAnswers} из ${quizCard.questionsCount} вопросов`
                      }
                    >
                      <Text>
                        Мозговой отчёт (завершено)
                      </Text>
                    </Cell>
                  ))}
                  {(!quizCard.completed && (
                    <Cell
                      multiline
                      description={<div className="Common--quizDescription">Ответьте на 10 вопросов, чтобы не платить налог на Ваши мозголомки, а также заработать монет.</div>}
                      size="l"
                      bottomContent={(
                        <Button
                          mode="primary"
                          onClick={() => {
                            if (!quizCard.completed) setActivePanel('WorkPanel');
                          }}
                        >
                          Пройти сейчас
                        </Button>
                      )}
                    >
                      <Subhead weight="regular">
                        Мозговой отчёт
                      </Subhead>
                    </Cell>
                  ))}

                </Div>
              </Card>
            </Div>
            )}
          </div>

          <Separator style={{ marginTop: '10px' }} />

          <Mindbreakers
            data={[
              {
                title: 'Разное',
                text: 'Каким словом называют движение автомобилей по городу?',
                rent: 1,
                tax: 5,
              },
              {
                title: 'Математика',
                text: 'Как называется геометрическое тело, образованное вращением прямоугольника вокруг одной из его сторон?',
                rent: 2,
                tax: 5,
                isHot: true,
              },
            ]}
          />

          <BrainLeaderboard
            user={{
              first_name: VKuser.first_name,
              last_name: VKuser.last_name,
              photo_200: VKuser.photo_200,
              BP: VKuser.BP,
            }}
          />

        </div>
      )}


      {/*      <Div>
        <Headline level={2} weight="semibold">Интересные факты</Headline>
        {renderedFacts.length ? renderedFacts : <Spinner size="large" />}
      </Div> */}

    </Panel>
  );
};

Common.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
};
Common.defaultProps = {};
export default Common;
