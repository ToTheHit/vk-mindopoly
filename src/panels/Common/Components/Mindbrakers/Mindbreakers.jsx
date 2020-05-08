import React, { useEffect, useRef, useState } from 'react';
import './mindbreakers.css';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  classNames,
  Div,
  Group,
  Header,
  HorizontalScroll,
  Placeholder,
  Subhead,
  Text,
} from '@vkontakte/vkui';

import Icon28MarketOutline from '@vkontakte/icons/dist/28/market_outline';

const Mindbreakers = (props) => {
  const { questions } = props;

  const [renderedCards, setRenderedCards] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);

  const refThemeButton1 = useRef(null);
  const refThemeButton2 = useRef(null);
  const refThemeButton3 = useRef(null);
  const refThemeButton4 = useRef(null);
  const refThemeButton5 = useRef(null);
  const refThemeButton6 = useRef(null);
  const refThemeButton7 = useRef(null);
  const refThemeButton8 = useRef(null);
  const refThemeButton9 = useRef(null);
  const refThemeButton10 = useRef(null);
  const refThemeButton11 = useRef(null);
  const refThemeButton12 = useRef(null);
  const refThemeButton13 = useRef(null);
  const [refCurrentThemeButton, setRefCurrentThemeButton] = useState(null);

  useEffect(() => {
    setQuestionsData([
      {
        theme: 'Другое',
        text: 'Каким словом называют движение автомобилей по городу?',
        answers: ['Мафик', 'Траффик', 'График', 'Профик'],
        category: 'Other',
        correctAnswer: 1,
        GP: 1,
      },
      {
        theme: 'Математика',
        text: 'Как называется геометрическое тело, образованное вращением прямоугольника вокруг одной из его сторон?',
        answers: ['Треугольник', 'Носорог', 'Сфера', 'Цилиндр'],
        category: 'Geometry',
        correctAnswer: 3,
        GP: 2,
        isHot: true,
      },
    ]);
    setRefCurrentThemeButton(refThemeButton1);
  }, []);

  useEffect(() => {
    const rendered = questionsData.map((item) => (
      <Card mode="outline" className="Mindbreakers--card" key={`Mindbreakers--card_${item.text}`}>
        <Div>
          <div
            className={
              classNames('Mindbreakers--card__header',
                { 'Mindbreakers--card__header-hot': item.isHot })
            }
          >
            {item.theme}
          </div>
          <Text className="Mindbreakers--card__text">
            {item.text}
          </Text>

          <div className="Mindbreakers--card__footer">
            <Subhead weight="medium" className="Mindbreakers--card__footer-item">
              {`${item.GP} GP`}
            </Subhead>
          </div>
        </Div>
      </Card>
    ));

    const sortedCards = { Все: [] };
    for (let i = 0; i < questionsData.length; i += 1) {
      if (!sortedCards[questionsData[i].theme]) {
        sortedCards[questionsData[i].theme] = [];
      }
      sortedCards[questionsData[i].theme].push(rendered[i]);
      sortedCards['Все'].push(rendered[i]);
    }

    setRenderedCards(sortedCards);
  }, [questionsData]);

  return (
    <Group
      className="Mindbreakers"
      header={(
        <Header
          indicator={((refCurrentThemeButton && renderedCards[refCurrentThemeButton.current.getAttribute('data-theme')])
            ? renderedCards[refCurrentThemeButton.current.getAttribute('data-theme')].length : '')}
        >
          Мои вопросы
        </Header>
      )}
    >

      <HorizontalScroll>
        <div className="Mindbreakers__themes">
          <div ref={refThemeButton1} className="Mindbreakers__themes-divider" data-theme="Все">
            <Button
              mode="tertiary"
              className={classNames('Mindbreakers__themes--button', { 'Mindbreakers__themes--button-selected': refCurrentThemeButton === refThemeButton1 })}
              onClick={() => {
                setRefCurrentThemeButton(refThemeButton1);
              }}
            >
              <Text>
                Все
              </Text>
            </Button>
          </div>

          <div
            ref={refThemeButton2}
            className="Mindbreakers__themes-divider"
            data-theme="Математика"
          >
            <Button
              mode="tertiary"
              className={classNames('Mindbreakers__themes--button', { 'Mindbreakers__themes--button-selected': refCurrentThemeButton === refThemeButton2 })}
              onClick={() => setRefCurrentThemeButton(refThemeButton2)}
            >
              <Text>
                Математика
              </Text>
            </Button>
          </div>
          <div
            ref={refThemeButton3}
            className="Mindbreakers__themes-divider"
            data-theme="Русский язык"
          >
            <Button
              mode="tertiary"
              className={classNames('Mindbreakers__themes--button', { 'Mindbreakers__themes--button-selected': refCurrentThemeButton === refThemeButton3 })}
              onClick={() => setRefCurrentThemeButton(refThemeButton3)}
            >
              <Text>
                Русский язык
              </Text>
            </Button>
          </div>

          <div
            ref={refThemeButton4}
            className="Mindbreakers__themes-divider"
            data-theme="Литература"
          >
            <Button
              mode="tertiary"
              className={classNames('Mindbreakers__themes--button', { 'Mindbreakers__themes--button-selected': refCurrentThemeButton === refThemeButton4 })}
              onClick={() => setRefCurrentThemeButton(refThemeButton4)}
            >
              <Text>
                Литература
              </Text>
            </Button>
          </div>

          <div ref={refThemeButton5} className="Mindbreakers__themes-divider" data-theme="Физика">
            <Button
              mode="tertiary"
              className={classNames('Mindbreakers__themes--button', { 'Mindbreakers__themes--button-selected': refCurrentThemeButton === refThemeButton5 })}
              onClick={() => setRefCurrentThemeButton(refThemeButton5)}
            >
              <Text>
                Физика
              </Text>
            </Button>
          </div>

          <div ref={refThemeButton6} className="Mindbreakers__themes-divider" data-theme="Химия">
            <Button
              mode="tertiary"
              className={classNames('Mindbreakers__themes--button', { 'Mindbreakers__themes--button-selected': refCurrentThemeButton === refThemeButton6 })}
              onClick={() => setRefCurrentThemeButton(refThemeButton6)}
            >
              <Text>
                Химия
              </Text>
            </Button>
          </div>
          <div
            ref={refThemeButton7}
            className="Mindbreakers__themes-divider"
            data-theme="Астрономия"
          >
            <Button
              mode="tertiary"
              className={classNames('Mindbreakers__themes--button', { 'Mindbreakers__themes--button-selected': refCurrentThemeButton === refThemeButton7 })}
              onClick={() => setRefCurrentThemeButton(refThemeButton7)}
            >
              <Text>
                Астрономия
              </Text>
            </Button>
          </div>

          <div ref={refThemeButton8} className="Mindbreakers__themes-divider" data-theme="Биология">
            <Button
              mode="tertiary"
              className={classNames('Mindbreakers__themes--button', { 'Mindbreakers__themes--button-selected': refCurrentThemeButton === refThemeButton8 })}
              onClick={() => setRefCurrentThemeButton(refThemeButton8)}
            >
              <Text>
                Биология
              </Text>
            </Button>
          </div>

          <div ref={refThemeButton9} className="Mindbreakers__themes-divider" data-theme="История">
            <Button
              mode="tertiary"
              className={classNames('Mindbreakers__themes--button', { 'Mindbreakers__themes--button-selected': refCurrentThemeButton === refThemeButton9 })}
              onClick={() => setRefCurrentThemeButton(refThemeButton9)}
            >
              <Text>
                История
              </Text>
            </Button>
          </div>

          <div
            ref={refThemeButton10}
            className="Mindbreakers__themes-divider"
            data-theme="Искусство"
          >
            <Button
              mode="tertiary"
              className={classNames('Mindbreakers__themes--button', { 'Mindbreakers__themes--button-selected': refCurrentThemeButton === refThemeButton10 })}
              onClick={() => setRefCurrentThemeButton(refThemeButton10)}
            >
              <Text>
                Искусство
              </Text>
            </Button>
          </div>

          <div ref={refThemeButton11} className="Mindbreakers__themes-divider" data-theme="Спорт">
            <Button
              mode="tertiary"
              className={classNames('Mindbreakers__themes--button', { 'Mindbreakers__themes--button-selected': refCurrentThemeButton === refThemeButton11 })}
              onClick={() => setRefCurrentThemeButton(refThemeButton11)}
            >
              <Text>
                Спорт
              </Text>
            </Button>
          </div>
          <div
            ref={refThemeButton12}
            className="Mindbreakers__themes-divider"
            data-theme="География"
          >
            <Button
              mode="tertiary"
              className={classNames('Mindbreakers__themes--button', { 'Mindbreakers__themes--button-selected': refCurrentThemeButton === refThemeButton12 })}
              onClick={() => setRefCurrentThemeButton(refThemeButton12)}
            >
              <Text>
                География
              </Text>
            </Button>
          </div>
          <div ref={refThemeButton13} className="Mindbreakers__themes-divider" data-theme="Другое">
            <Button
              mode="tertiary"
              className={classNames('Mindbreakers__themes--button', { 'Mindbreakers__themes--button-selected': refCurrentThemeButton === refThemeButton13 })}
              onClick={() => setRefCurrentThemeButton(refThemeButton13)}
            >
              <Text>
                Другое
              </Text>
            </Button>
          </div>
        </div>
      </HorizontalScroll>

      {(refCurrentThemeButton && renderedCards[refCurrentThemeButton.current.getAttribute('data-theme')] && (renderedCards[refCurrentThemeButton.current.getAttribute('data-theme')].length > 0) ? (
        <Div style={{ paddingBottom: 0, paddingTop: '18px' }}>
          {renderedCards[refCurrentThemeButton.current.getAttribute('data-theme')]}
        </Div>
      ) : (
        <Placeholder
          icon={<Icon28MarketOutline width={38} height={43} />}
          action={<Button mode="tertiary">Перейти в магазин</Button>}
        >
          Приобретайте вопросы в магазине и зарабатывайте очки BP на чужих ошибках.
        </Placeholder>
      ))}


    </Group>

  );
};

Mindbreakers.propTypes = {
  // questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
Mindbreakers.defaultProps = {};
export default Mindbreakers;
