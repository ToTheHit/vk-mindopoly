import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Cell,
  Div,
  Group,
  Header,
  Headline,
  Panel,
  PanelHeader, Separator,
  SimpleCell,
  Spinner,
  Text,
} from '@vkontakte/vkui';
import Icon28RefreshOutline from '@vkontakte/icons/dist/28/refresh_outline';
import Icon28MarketOutline from '@vkontakte/icons/dist/28/market_outline';
import IconQuizCard from '../../assets/Common/IconQuizCard.png';

import './common.css';

const Common = (props) => {
  const { id, setActivePanel } = props;
  const [quizeCard, setQuizeCard] = useState({
    completed: false, date: '25 апреля', trueAnswers: 3, questionsCount: 5,
  });
  const [renderedQuestions, setRenderedQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [GP, setGP] = useState(20);

  // Эффект, в котором нужно будет запросить у сервера пачку "вопрос-ответ"
  // и, возможно, другую информацию
  useEffect(() => {
    setQuestions([
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
  }, []);

  useEffect(() => {
    const renderedItems = questions.map((item) => (
      <Cell key={item.question} description={item.answer} multiline>{item.question}</Cell>
    ));
    setRenderedQuestions(renderedItems);
  }, [questions]);

  function updateQuestions() {
    setQuestions([]);

    // Запрос на сервер за новыми вопросами
    setTimeout(() => {
      setQuestions([
        {
          question: 'Кто зелебоба?',
          answer: 'ТЫ',
        },
      ]);
    }, 1000);
  }

  return (
    <Panel id={id} className="Common">
      <PanelHeader>
        Продлёнка
      </PanelHeader>
      <div>
        {quizeCard && (
          <Div style={{ paddingBottom: 0 }}>
            <Card size="l">
              <Div
                className="Common--quizCard"
                onClick={() => {
                  setActivePanel('WorkPanel');
                }}
              >
                <div
                  className="Common__iconQuiz"
                  style={{ backgroundImage: `url(${IconQuizCard})` }}
                />
                {(quizeCard.completed && (
                  <Cell
                    multiline
                    description={
                      `Вы ответили на ${quizeCard.trueAnswers} из ${quizeCard.questionsCount} вопросов`
                    }
                  >
                    <Text>
                      Самостоялка (завершено)
                    </Text>
                  </Cell>
                ))}
                {(!quizeCard.completed && (
                  <Cell
                    multiline
                    expandable
                    description="Пять случайных вопросов из разделов: математика, история, литература, физика и спорт."
                  >
                    <Text>
                      Самостоялка,
                      {' '}
                      {quizeCard.date}
                    </Text>
                  </Cell>
                ))}

              </Div>
            </Card>
          </Div>
        )}
        <SimpleCell
          disabled
          after={(
            <Button
              mode="commerce"
              before={<Icon28MarketOutline fill="#FFF" />}
            >
              магазин
            </Button>
            )}
        >
          <Header
            level={2}
            weight="semibold"
            className="Common--GPcounter"
          >
            {GP}
          </Header>
          <Header mode="secondary" weight="semibold" className="Common--GPcounter">GP</Header>
        </SimpleCell>
        <SimpleCell
          multiline
          disabled
          description="Зарабатывайте Genius Points, решая ежедневные самостоятельные работы. Полученные GP можно потратить в магазине."
          style={{ marginTop: '-15px' }}
        />
        <Separator />
        <Div>
          <Headline level={2} weight="semibold">Интересные факты</Headline>
          {renderedQuestions.length ? renderedQuestions : <Spinner size="large" />}
          <Button
            size="xl"
            mode="secondary"
            before={<Icon28RefreshOutline />}
            style={{ marginTop: '15px' }}
            onClick={() => {
              updateQuestions();
            }}
          >
            Обновить за 20GP
          </Button>
        </Div>
      </div>
    </Panel>
  );
};

Common.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
};
Common.defaultProps = {};
export default Common;
