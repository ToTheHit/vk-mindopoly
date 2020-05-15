// TODO: Переписать референсы

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
  Text,
  Subhead,
} from '@vkontakte/vkui';

import Icon28MarketOutline from '@vkontakte/icons/dist/28/market_outline';
import { useDispatch, useSelector } from 'react-redux';
import globalVariables from '../../../../GlobalVariables';

const Mindbreakers = (props) => {
  const dispatch = useDispatch();
  const caregoriesHorizontalScroll = useSelector((state) => state.userInfo.caregoriesHorizontalScroll);
  const selectedTab = useSelector((state) => state.userInfo.selectedTab);
  const scheme = useSelector((state) => state.schemeChanger.scheme);

  const {
    setActivePanel, setSelectedQuestion, setActiveStory, questions,
  } = props;
  const [renderedCards, setRenderedCards] = useState([]);

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

  const scrollRef = useRef(null);

  useEffect(() => {
    if (!selectedTab) {
      setRefCurrentThemeButton(refThemeButton1);
    } else {
      switch (selectedTab) {
        case 'Все': { setRefCurrentThemeButton(refThemeButton1); break; }
        case 'Математика': { setRefCurrentThemeButton(refThemeButton2); break; }
        case 'Русский язык': { setRefCurrentThemeButton(refThemeButton3); break; }
        case 'Литература': { setRefCurrentThemeButton(refThemeButton4); break; }
        case 'Физика': { setRefCurrentThemeButton(refThemeButton5); break; }
        case 'Химия': { setRefCurrentThemeButton(refThemeButton6); break; }
        case 'Астрономия': { setRefCurrentThemeButton(refThemeButton7); break; }
        case 'Биология': { setRefCurrentThemeButton(refThemeButton8); break; }
        case 'История': { setRefCurrentThemeButton(refThemeButton9); break; }
        case 'Искусство': { setRefCurrentThemeButton(refThemeButton10); break; }
        case 'Спорт': { setRefCurrentThemeButton(refThemeButton11); break; }
        case 'География': { setRefCurrentThemeButton(refThemeButton12); break; }
        case 'Другое': { setRefCurrentThemeButton(refThemeButton13); break; }
        default: { setRefCurrentThemeButton(refThemeButton1); break; }
      }

      setTimeout(() => {
        scrollRef.current.parentNode.scrollLeft = caregoriesHorizontalScroll;
      }, 50);
    }
  }, []);

  useEffect(() => {
    if (refCurrentThemeButton && refCurrentThemeButton.current) {
      dispatch({
        type: 'UPDATE_USER_INFO',
        payload: { selectedTab: refCurrentThemeButton.current.getAttribute('data-theme'), caregoriesHorizontalScroll: scrollRef.current.parentNode.scrollLeft },
      });
    }
  }, [refCurrentThemeButton]);

  useEffect(() => {
    const rendered = questions.map((item) => (
      <Card
        mode={scheme === 'space_gray' ? 'tint' : 'outline'}
        className={classNames('Mindbreakers--card', { 'Mindbreakers--card-dark': scheme === 'space_gray' })}
        key={`Mindbreakers--card_${item.text}`}
        onClick={() => {
          setSelectedQuestion(item);
          setActivePanel('QuestionDetails');
        }}
      >
        <Div>
          <div
            className={
              classNames('Mindbreakers--card__header')
            }
            style={{ color: globalVariables.categoryColor(item.category) }}
          >
            <div className="Mindbreakers--card__header-dot" style={{ backgroundColor: globalVariables.categoryColor(item.category) }} />
            {globalVariables.translateEnToRu(item.category)}
          </div>
          <Text className="Mindbreakers--card__text">
            {item.text}
          </Text>

          {(!item.approved && (
            <div className="Mindbreakers--card__footer">
              <Subhead weight="medium" className="Mindbreakers--card__footer-item">
                Вопрос на проверке
              </Subhead>
            </div>
          ))}

        </Div>
      </Card>
    ));

    const sortedCards = { Все: [] };
    for (let i = 0; i < questions.length; i += 1) {
      if (!sortedCards[globalVariables.translateEnToRu(questions[i].category)]) {
        sortedCards[globalVariables.translateEnToRu(questions[i].category)] = [];
      }
      sortedCards[globalVariables.translateEnToRu(questions[i].category)].push(rendered[i]);
      sortedCards['Все'].push(rendered[i]);
    }

    if (sortedCards['Все'].length > 0) {
      setRenderedCards(sortedCards);
    }
  }, [questions]);

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

      <div>
        <HorizontalScroll>
          <div className="Mindbreakers__themes" ref={scrollRef}>
            <div
              ref={refThemeButton1}
              className="Mindbreakers__themes-divider"
              data-theme="Все"
              style={{ display: (!renderedCards['Все'] && 'none') }}
            >
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
              style={{ display: (!renderedCards['Математика'] && 'none') }}
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
              style={{ display: (!renderedCards['Русский язык'] && 'none') }}
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
              style={{ display: (!renderedCards['Литература'] && 'none') }}
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

            <div
              ref={refThemeButton5}
              className="Mindbreakers__themes-divider"
              data-theme="Физика"
              style={{ display: (!renderedCards['Физика'] && 'none') }}
            >
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

            <div
              ref={refThemeButton6}
              className="Mindbreakers__themes-divider"
              data-theme="Химия"
              style={{ display: (!renderedCards['Химия'] && 'none') }}
            >
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
              style={{ display: (!renderedCards['Астрономия'] && 'none') }}
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

            <div
              ref={refThemeButton8}
              className="Mindbreakers__themes-divider"
              data-theme="Биология"
              style={{ display: (!renderedCards['Биология'] && 'none') }}
            >
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

            <div
              ref={refThemeButton9}
              className="Mindbreakers__themes-divider"
              data-theme="История"
              style={{ display: (!renderedCards['История'] && 'none') }}
            >
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
              style={{ display: (!renderedCards['Искусство'] && 'none') }}
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

            <div
              ref={refThemeButton11}
              className="Mindbreakers__themes-divider"
              data-theme="Спорт"
              style={{ display: (!renderedCards['Спорт'] && 'none') }}
            >
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
              style={{ display: (!renderedCards['География'] && 'none') }}
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
            <div
              ref={refThemeButton13}
              className="Mindbreakers__themes-divider"
              data-theme="Другое"
              style={{ display: (!renderedCards['Другое'] && 'none') }}
            >
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
      </div>

      {(refCurrentThemeButton && renderedCards[refCurrentThemeButton.current.getAttribute('data-theme')] && (renderedCards[refCurrentThemeButton.current.getAttribute('data-theme')].length > 0) ? (
        <Div style={{ paddingBottom: 0, paddingTop: '18px' }}>
          {renderedCards[refCurrentThemeButton.current.getAttribute('data-theme')]}
        </Div>
      ) : (
        <Placeholder
          icon={<Icon28MarketOutline width={38} height={43} />}
          action={<Button mode="tertiary" onClick={() => setActiveStory('Shop')}>Перейти в магазин</Button>}
        >
          Приобретайте вопросы в магазине и зарабатывайте очки BP на чужих ошибках.
        </Placeholder>
      ))}
    </Group>

  );
};

Mindbreakers.propTypes = {
  setActivePanel: PropTypes.func.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
  setActiveStory: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.string),
    approved: PropTypes.bool,
    bpEarned: PropTypes.shape({
      overall: PropTypes.number,
      today: PropTypes.number,
      yesterday: PropTypes.number,
    }),
    bpForError: PropTypes.number,
    category: PropTypes.string,
    error_count: PropTypes.shape({
      overall: PropTypes.number,
      today: PropTypes.number,
      yesterday: PropTypes.number,
    }),
    requestedBy: PropTypes.any,
    views: PropTypes.shape({
      overall: PropTypes.number,
      today: PropTypes.number,
      yesterday: PropTypes.number,
    }),
    text: PropTypes.string,
  })).isRequired,
};
Mindbreakers.defaultProps = {};
export default Mindbreakers;
