import React from 'react';
import PropTypes from 'prop-types';
import './balance.css';
import {
  Card, Div, HorizontalScroll, SimpleCell, Text, Title,
} from '@vkontakte/vkui';
import Icon32Coins from '../../../../assets/Quiz/icn32_coins.png';
import Icon32Genius from '../../../../assets/Quiz/icn32_genius.png';
import Icon32Tax from '../../../../assets/StartPanel/blueIcons/icn32_tax.png';
import Icon32GeniusPlus from '../../../../assets/StartPanel/blueIcons/icn32_genius_plus.png';

const Balance = (props) => {
  const {
    coins, GP, tax, GPgrowth,
  } = props;
  return (
    <div className="Balance">
      <Text className="Balance__title">ваш баланс</Text>
      <div className="Balance__row">
        <div className="Balance__item">
          <div style={{ backgroundImage: `url(${Icon32Coins})` }} className="Balance__icon" />
          <Title
            level="1"
            className="Balance--GPcounter"
          >
            {coins}
          </Title>
          <Title
            level="1"
            className="Balance--GPcounter_currency"
          >
            M
          </Title>
        </div>
        <div className="Balance__item">
          <div style={{ backgroundImage: `url(${Icon32Genius})` }} className="Balance__icon" />
          <Title
            level="1"
            className="Balance--GPcounter"
          >
            {GP}
          </Title>
          <Title
            level="1"
            className="Balance--GPcounter_currency"
          >
            GP
          </Title>
        </div>
      </div>

      <HorizontalScroll>
        <div className="Balance__row-scroll">
          <div className="Balance__row-scroll__item">

            <Card mode="shadow">
              <Div style={{ padding: '0 12px' }}>
                <SimpleCell
                  className="Balance__tax"
                  disabled
                  before={(
                    <div
                      style={{ backgroundImage: `url(${Icon32Tax})` }}
                      className="Balance__icon"
                    />
                  )}
                  description="Мозговой налог"
                >
                  <div className="Balance__tax--textRed">
                    {`${tax} М`}
                  </div>
                </SimpleCell>
              </Div>
            </Card>
          </div>

          <div className="Balance__row-scroll__item">
            <Card mode="shadow">
              <Div style={{ padding: '0 12px' }}>
                <SimpleCell
                  className="Balance__tax"
                  disabled
                  before={(
                    <div
                      style={{ backgroundImage: `url(${Icon32GeniusPlus})` }}
                      className="Balance__icon"
                    />
                  )}
                  description="Прирост гения"
                >
                  <div className="Balance__tax--textGreen">
                    {`${GPgrowth} GP`}
                  </div>
                </SimpleCell>
              </Div>
            </Card>
          </div>

        </div>
      </HorizontalScroll>

    </div>
  );
};

Balance.propTypes = {
  coins: PropTypes.number.isRequired,
  GP: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  GPgrowth: PropTypes.number.isRequired,
};
Balance.defaultProps = {};
export default Balance;
