import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { Cell, Panel, PanelHeader, ScreenSpinner, Separator, } from '@vkontakte/vkui';

import './main.css';
import bridge from '@vkontakte/vk-bridge';
import Mindbreakers from '../Components/Mindbrakers/Mindbreakers';
import Balance from '../Components/Balance/Balance';
import QuizCard from '../Components/QuizCard/QuizCard';

const Main = (props) => {
  const { id, setActivePanel, setSelectedQuestion } = props;
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
    GP: 62,
    GPgrowth: 20,
    tax: 75,
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
    }, 100);
  }, []);

  useEffect(() => {
    const renderedItems = facts.map((item) => (
      <Cell key={item.question} description={item.answer} multiline>{item.question}</Cell>
    ));
    setRenderedFacts(renderedItems);
  }, [facts]);

  return (
    <Panel id={id} className="Main" centered={!showScreen}>
      <PanelHeader>
        Мозгополия
      </PanelHeader>
      {!showScreen && <ScreenSpinner />}

      {showScreen && (
        <div>
          <Balance
            coins={VKuser.coins}
            GP={VKuser.GP}
            tax={VKuser.tax}
            GPgrowth={VKuser.GPgrowth}
          />

          <div>
            {quizCard && (
              <QuizCard setActivePanel={setActivePanel} date="6 мая" />
            )}
          </div>

          <Separator style={{ marginTop: '10px' }} />
          <Mindbreakers />

          {/*          <BrainLeaderboard
            user={{
              first_name: VKuser.first_name,
              last_name: VKuser.last_name,
              photo_200: VKuser.photo_200,
              BP: VKuser.BP,
            }}
          /> */}

        </div>
      )}


      {/*      <Div>
        <Headline level={2} weight="semibold">Интересные факты</Headline>
        {renderedFacts.length ? renderedFacts : <Spinner size="large" />}
      </Div> */}

    </Panel>
  );
};

Main.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired
};
Main.defaultProps = {};
export default Main;
