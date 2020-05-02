import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Panel, Text, Title,
} from '@vkontakte/vkui';

import icon1 from '../../../assets/StartPanel/icon1.svg';
import icon2 from '../../../assets/StartPanel/icon2.svg';
import icon3 from '../../../assets/StartPanel/icon3.svg';
import icon4 from '../../../assets/StartPanel/icon4.svg';
import icon5 from '../../../assets/StartPanel/icon5.svg';
import icon6 from '../../../assets/StartPanel/icon6.svg';
import icon7 from '../../../assets/StartPanel/icon7.svg';
import icon8 from '../../../assets/StartPanel/icon8.svg';
import icon9 from '../../../assets/StartPanel/icon9.svg';

const StartPanel1 = (props) => {
  const { goToNextSlide, id } = props;

  return (
    <Panel id={id} className="StartPanel">
      <div className="StartPanel--content">

        <Title level="1" weight="heavy" className="StartPanel--title">
          Продлёнка
          <div className="StartPanel--iconGroup">
            <div className="StartPanel--iconGroup_line">
              <img className="StartPanel--iconGroup--icon" src={icon1} alt="icon1" />
              <img className="StartPanel--iconGroup--icon" src={icon2} alt="icon2" />
              <img className="StartPanel--iconGroup--icon" src={icon3} alt="icon3" />
            </div>
            <div className="StartPanel--iconGroup_line">
              <img className="StartPanel--iconGroup--icon" src={icon4} alt="icon4" />
              <img className="StartPanel--iconGroup--icon" src={icon5} alt="icon5" />
              <img className="StartPanel--iconGroup--icon" src={icon6} alt="icon6" />
            </div>
            <div className="StartPanel--iconGroup_line">
              <img className="StartPanel--iconGroup--icon" src={icon7} alt="icon7" />
              <img className="StartPanel--iconGroup--icon" src={icon8} alt="icon8" />
              <img className="StartPanel--iconGroup--icon" src={icon9} alt="icon9" />
            </div>
          </div>

        </Title>
        <Text weight="regular" className="StartPanel--text">
          Добро пожаловать в Продлёнку. Пишите
          ежедневные самостоятельные работы,
          зарабатывайте баллы и расширяйте
          свой кругозор!
        </Text>
        <Button
          size="l"
          onClick={() => {
            goToNextSlide(1);
          }}
        >
          Начать обучение
        </Button>
      </div>
    </Panel>
  );
};

StartPanel1.propTypes = {
  goToNextSlide: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default StartPanel1;
