import React from 'react';
import PropTypes from 'prop-types';
import './myBalance.css';
import {
  Card, Div, Group, Header,
} from '@vkontakte/vkui';
import Icon28BrainOutline from '@vkontakte/icons/dist/28/brain_outline';


const MyBalance = (props) => {
  const { GP, coins } = props;
  return (
    <Group
      className="MyBalance"
      separator="hide"
      header={(
        <Header className="MyBalance__header">
          Ваш счёт
        </Header>
      )}
    >
      <Div
        className="MyBalance__cardRow"
      >
        <Card
          className="MyBalance__card"
        >
          <Div
            className="MyBalance__card--content"
          >
            <div>
              <div
                className="MyBalance__card--iconPlace MyBalance__card--iconPlace_coins"
              >
                <svg width="10px" height="18px" viewBox="0 0 10 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="icn32_mindocoins" transform="translate(-11.000000, -7.000000)" fill="#FFFFFF" fillRule="nonzero">
                      <g id="$">
                        <path d="M16.0246792,25 C16.4787759,25 16.8144126,24.7291667 16.8144126,24.1458333 L16.8144126,23.1875 C19.4007897,22.90625 21,21.3020833 21,18.96875 C21,16.9583333 19.8647581,15.7291667 17.4560711,15.1354167 L15.3632774,14.6041667 C14.1095755,14.3020833 13.4679171,13.6145833 13.4679171,12.65625 C13.4679171,11.4583333 14.4353406,10.625 15.9358342,10.625 C17.130306,10.625 17.9397828,11.0729167 18.798618,12.1979167 C19.2033564,12.6979167 19.4896347,12.8645833 19.8845015,12.8645833 C20.3780849,12.8645833 20.7433366,12.5104167 20.7433366,11.9583333 C20.7433366,11.3854167 20.4076999,10.7291667 19.8351431,10.15625 C19.124383,9.42708333 18.0681145,8.95833333 16.893386,8.79166667 L16.893386,7.85416667 C16.893386,7.27083333 16.5380059,7 16.0839092,7 C15.6298124,7 15.284304,7.27083333 15.284304,7.85416667 L15.284304,8.76041667 C12.816387,9 11.23692,10.5625 11.23692,12.8125 C11.23692,14.75 12.3919052,16.09375 14.5439289,16.625 L16.6663376,17.1770833 C18.1569595,17.5625 18.7788746,18.15625 18.7788746,19.1770833 C18.7788746,20.5 17.8015795,21.3229167 16.1036525,21.3229167 C14.810464,21.3229167 13.8232971,20.8229167 12.9249753,19.6979167 C12.4610069,19.1458333 12.2537019,19.0416667 11.9180652,19.0416667 C11.3849951,19.0416667 11,19.40625 11,20.0208333 C11,20.6354167 11.3652517,21.3020833 11.9871668,21.8645833 C12.7670286,22.5833333 13.9318855,23.0520833 15.2152024,23.1770833 L15.2152024,24.1458333 C15.2152024,24.7291667 15.5607108,25 16.0246792,25 Z" />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="MyBalance__card--title">
                монеты
              </div>
            </div>
            <div
              className="MyBalance__card--counter"
            >
              {coins.toLocaleString('ru-RU')}
            </div>
          </Div>

        </Card>

        <Card
          className="MyBalance__card"
        >
          <Div
            className="MyBalance__card--content"
          >
            <div>
              <div
                className="MyBalance__card--iconPlace MyBalance__card--iconPlace_GP"
              >
                <Icon28BrainOutline className="MyBalance__card--icon" width={24} height={24} />
              </div>
              <div className="MyBalance__card--title">
                очки гения
              </div>
            </div>
            <div
              className="MyBalance__card--counter"
            >
              {GP.toLocaleString('ru-RU')}
            </div>
          </Div>

        </Card>
      </Div>

    </Group>
  );
};

MyBalance.propTypes = {
  GP: PropTypes.number.isRequired,
  coins: PropTypes.number.isRequired,
};
MyBalance.defaultProps = {};
export default MyBalance;
