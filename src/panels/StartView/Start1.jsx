import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Panel, Text, Title,
} from '@vkontakte/vkui';

import icon1 from '../../assets/start1/icon1.svg';
import icon2 from '../../assets/start1/icon2.svg';
import icon3 from '../../assets/start1/icon3.svg';
import icon4 from '../../assets/start1/icon4.svg';
import icon5 from '../../assets/start1/icon5.svg';
import icon6 from '../../assets/start1/icon6.svg';
import icon7 from '../../assets/start1/icon7.svg';
import icon8 from '../../assets/start1/icon8.svg';
import icon9 from '../../assets/start1/icon9.svg';

const Start1 = (props) => {
  const { goToNextSlide, id } = props;

  return (
    <Panel id={id} className="StartView">
      <div className="StartView--content">

        <Title level="1" weight="heavy" className="StartView--title">
          Продлёнка
          <div className="StartView--iconGroup">
            <div className="StartView--iconGroup_line">
              <img className="StartView--iconGroup--icon" src={icon1} alt="icon1" />
              <img className="StartView--iconGroup--icon" src={icon2} alt="icon2" />
              <img className="StartView--iconGroup--icon" src={icon3} alt="icon3" />
            </div>
            <div className="StartView--iconGroup_line">
              <img className="StartView--iconGroup--icon" src={icon4} alt="icon4" />
              <img className="StartView--iconGroup--icon" src={icon5} alt="icon5" />
              <img className="StartView--iconGroup--icon" src={icon6} alt="icon6" />
            </div>
            <div className="StartView--iconGroup_line">
              <img className="StartView--iconGroup--icon" src={icon7} alt="icon7" />
              <img className="StartView--iconGroup--icon" src={icon8} alt="icon8" />
              <img className="StartView--iconGroup--icon" src={icon9} alt="icon9" />
            </div>
          </div>

        </Title>
        <Text weight="regular" className="StartView--text">
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

Start1.propTypes = {
  goToNextSlide: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Start1;
