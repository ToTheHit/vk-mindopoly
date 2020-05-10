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
import axios from 'axios';
import bridge from '@vkontakte/vk-bridge';
import globalVariables from '../../../../GlobalVariables';

const Mindbreakers = (props) => {
  const { setActivePanel, setSelectedQuestion, setActiveStory } = props;
  const [questions, setQuestions] = useState([]);
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

  useEffect(() => {
    setRefCurrentThemeButton(refThemeButton1);

    bridge.send('VKWebAppStorageGet', { keys: [globalVariables.authToken] })
      .then(((bridgeData) => {
        const urlParams = new URLSearchParams(window.location.search);

        if (bridgeData.keys[0].value) {
          axios.get(`${globalVariables.serverURL}/api/userQuestions`, {
            params: {
              token: bridgeData.keys[0].value,
              id: urlParams.get('vk_user_id'),
            },
          })
            .then((data) => {
              setQuestions(data.data.attachment);
            })
            .catch((err) => {
              console.info('Main, get/userQuestions', err);
              // Сервер не нашёл токен в БД.
              // Перемещение на стартовый экран
            });
        } else {
          // Перемещение на стартовый экран

        }
      }));
  }, []);

  useEffect(() => {
    console.info(questions);
    const rendered = questions.map((item) => (
      <Card
        mode="outline"
        className="Mindbreakers--card"
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

          {(item.approved && (
            <div className="Mindbreakers--card__footer">
              <Subhead weight="medium" className="Mindbreakers--card__footer-item">
                {`Вопрос на проверке`}
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

      <HorizontalScroll>
        <div className="Mindbreakers__themes">
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
};
Mindbreakers.defaultProps = {};
export default Mindbreakers;
