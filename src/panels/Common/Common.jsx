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
} from '@vkontakte/vkui';
import Icon16Market from '../../assets/Common/icon_market_16.svg';
import Icon16Coin from '../../assets/Common/icn_coin_16.svg';

import './common.css';
import BrainLeaderboard from './BrainLeaderboard';
import MyQuestionGallery from "./Components/MyQuestionGallery/MyQuestionGallery";

const Common = (props) => {
  const { id, setActivePanel } = props;
  const [quizCard, setquizCard] = useState({
    completed: false, date: '25 апреля', trueAnswers: 3, questionsCount: 5,
  });
  const [renderedFacts, setRenderedFacts] = useState([]);
  const [facts, setFacts] = useState([]);
  const [myQuestions, setMyQuestions] = useState([]);
  const [fetchedUser, setUser] = useState({
    first_name: 'Test',
    last_name: 'User',
    photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
    BR: 62,
    coins: 2556,
  });
  const [userLeaderboardData, setUserLeaderboardData] = useState({
    worldPlace: 12803312,
    friendsPlace: 4,
  });

  // Начальный эффект, в котором нужно будет запросить у сервера пачку "вопрос-ответ"
  // и, возможно, другую информацию
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const renderedItems = facts.map((item) => (
      <Cell key={item.question} description={item.answer} multiline>{item.question}</Cell>
    ));
    setRenderedFacts(renderedItems);
  }, [facts]);


  return (
    <Panel id={id} className="Common">
      <PanelHeader>
        Продлёнка
      </PanelHeader>

      {/* Quiz card */}
      <div>
        {quizCard && (
          <Div style={{ paddingBottom: 0 }}>
            <Card size="l">
              <Div
                className="Common--quizCard"
              >
{/*                <div
                  className="Common__iconQuiz"
                  style={{ backgroundImage: `url(${IconQuizCard})` }}
                />*/}
                <img src={Icon16Coin} className="Common__iconQuiz" alt={'Icon coin'} />
                {(quizCard.completed && (
                  <Cell
                    multiline
                    description={
                      `Вы ответили на ${quizCard.trueAnswers} из ${quizCard.questionsCount} вопросов`
                    }
                  >
                    <Text>
                      Самостоялка (завершено)
                    </Text>
                  </Cell>
                ))}
                {(!quizCard.completed && (
                  <Cell
                    multiline
                    description="Пять случайных вопросов из разделов: математика, история, литература, физика и спорт."
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
                    <Text>
                      Самостоялка,
                      {' '}
                      {quizCard.date}
                    </Text>
                  </Cell>
                ))}

              </Div>
            </Card>
          </Div>
        )}
      </div>

      <Headline level={2} weight="semibold" className="Common--BrainHeader">Брейн-рейтинг</Headline>
      {fetchedUser && (
        <Group
          separator="hide"
          description={(
            <div>
              {`Вы на ${userLeaderboardData.worldPlace.toLocaleString()} месте в мире 
              и на ${userLeaderboardData.friendsPlace.toLocaleString()} месте среди друзей. Чтобы
              автоматически получать очки брейн-рейтинга, купите в магазине «Вопрос».`}
            </div>
          )}
          className="Common--user"
        >
          <SimpleCell
            disabled
            before={<Avatar src={fetchedUser.photo_200} />}
            indicator={<div>{`${fetchedUser.BR} BR`}</div>}
          >

            {`${fetchedUser.first_name} `}
            {' '}
            <b>{fetchedUser.last_name}</b>
          </SimpleCell>
        </Group>
      )}

      <Div className="Common--CustomQuestionBlock">
        <SimpleCell
          className="Common--ShopButton"
          disabled
          before={(
            <Button
              mode="commerce"
              before={<img src={Icon16Market} alt={'Icon shop'} className="Common--ShopButton_icon" />}
            >
              МАГАЗИН
            </Button>
          )}
        >
          <div className="Common--ShopButton_textAfter">
            {`У вас ${fetchedUser.coins} монет`}
          </div>
        </SimpleCell>

      </Div>
      <Separator />

      <Group
        header={(
          <Header
            mode="secondary"
            aside={
              <Button mode="tertiary" className={'Common--button__showAllQuestions'}>Показать все</Button>}
          >
            мои вопросы
          </Header>
        )}
      >
        <MyQuestionGallery questions={myQuestions} />
      </Group>

      <Group
        header={(
          <Header
            mode="secondary"
          >
            таблица лидеров
          </Header>
        )}
      >
        <BrainLeaderboard />

      </Group>

      <Div>
        <Headline level={2} weight="semibold">Интересные факты</Headline>
        {renderedFacts.length ? renderedFacts : <Spinner size="large" />}
      </Div>

    </Panel>
  );
};

Common.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
};
Common.defaultProps = {};
export default Common;
