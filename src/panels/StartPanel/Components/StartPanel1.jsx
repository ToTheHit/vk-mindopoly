import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Panel, Text, Title,
} from '@vkontakte/vkui';


import icon11 from '../../../assets/StartPanel/originalIcons/icon1.png';
import icon21 from '../../../assets/StartPanel/originalIcons/icon2.png';
import icon31 from '../../../assets/StartPanel/originalIcons/icon3.png';
import icon41 from '../../../assets/StartPanel/originalIcons/icon4.png';
import icon51 from '../../../assets/StartPanel/originalIcons/icon5.png';
import icon61 from '../../../assets/StartPanel/originalIcons/icon6.png';
import icon71 from '../../../assets/StartPanel/originalIcons/icon7.png';
import icon81 from '../../../assets/StartPanel/originalIcons/icon8.png';
import icon91 from '../../../assets/StartPanel/originalIcons/icon9.png';

import icon1 from '../../../assets/StartPanel/icon1.png';
import icon2 from '../../../assets/StartPanel/icon2.png';
import icon3 from '../../../assets/StartPanel/icon3.png';
import icon4 from '../../../assets/StartPanel/icon4.png';
import icon5 from '../../../assets/StartPanel/icon5.png';
import icon6 from '../../../assets/StartPanel/icon6.png';
import icon7 from '../../../assets/StartPanel/icon7.png';
import icon8 from '../../../assets/StartPanel/icon8.png';
import icon9 from '../../../assets/StartPanel/icon9.png';

const StartPanel1 = (props) => {
  const { goToNextSlide, id } = props;

  return (
    <Panel id={id} className="StartPanel">
      <div className="StartPanel--content">

        <Title level="1" weight="heavy" className="StartPanel--title">
          Продлёнка
          <div className="StartPanel--iconGroup">
            <div className="StartPanel--iconGroup__line">
              <div className="StartPanel--iconGroup__icon" style={{ backgroundImage: `url(${icon1})` }} />
              <div className="StartPanel--iconGroup__icon" style={{ backgroundImage: `url(${icon2})` }} />
              <div className="StartPanel--iconGroup__icon" style={{ backgroundImage: `url(${icon3})` }} />
            </div>
            <div className="StartPanel--iconGroup__line">
              <div className="StartPanel--iconGroup__icon" style={{ backgroundImage: `url(${icon4})` }} />
              <div className="StartPanel--iconGroup__icon" style={{ backgroundImage: `url(${icon5})` }} />
              <div className="StartPanel--iconGroup__icon" style={{ backgroundImage: `url(${icon6})` }} />
            </div>
            <div className="StartPanel--iconGroup__line">
              <div className="StartPanel--iconGroup__icon" style={{ backgroundImage: `url(${icon7})` }} />
              <div className="StartPanel--iconGroup__icon" style={{ backgroundImage: `url(${icon8})` }} />
              <div className="StartPanel--iconGroup__icon" style={{ backgroundImage: `url(${icon9})` }} />
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
