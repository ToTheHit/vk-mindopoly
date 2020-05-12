import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './effectGPDetails.css';
import {
  ANDROID,
  Cell,
  Div,
  Header,
  IOS,
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  Separator,
  SimpleCell,
  usePlatform,
  withModalRootContext,
} from '@vkontakte/vkui';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24DismissDark from '@vkontakte/icons/dist/24/dismiss_dark';
import { useSelector } from 'react-redux';
import Icon48Brain from '../../../../assets/Icons/icn48_brain.png';
import Icon64Math from '../../../../assets/Icons/icn64_math.png';
import Icon64Russian from '../../../../assets/Icons/icn64_rus.png';
import Icon64Litra from '../../../../assets/Icons/icn64_litra.png';
import Icon64Physics from '../../../../assets/Icons/icn64_physics.png';
import Icon64Chemistry from '../../../../assets/Icons/icn64_chem.png';
import Icon64Astro from '../../../../assets/Icons/icn64_astro.png';
import Icon64Biology from '../../../../assets/Icons/icn64_bio.png';
import Icon64History from '../../../../assets/Icons/icn64_history.png';
import Icon64Art from '../../../../assets/Icons/icn64_art.png';
import Icon64Sport from '../../../../assets/Icons/icn64_sport.png';
import Icon64Other from '../../../../assets/Icons/icn64_other.png';
import Icon64Geography from '../../../../assets/Icons/icn64_geography.png';
import globalVariables from '../../../../GlobalVariables';
import render from "less/lib/less/render";
import EffectGPDetailsContent from "./EffectGPDetailsContent";

const EffectGPDetails = (props) => {
  const platform = usePlatform();
  const { id, status, updateModalHeight } = props;

  const questions = useSelector((state) => state.userInfo.questions);
  const [categoryIncome, setCategoryIncome] = useState([]);

  function getIcon(category) {
    switch (category) {
      case 'Math': return Icon64Math;
      case 'Russian': return Icon64Russian;
      case 'Literature': return Icon64Litra;
      case 'Physics': return Icon64Physics;
      case 'Chemistry': return Icon64Chemistry;
      case 'Astronomy': return Icon64Astro;
      case 'Biology': return Icon64Biology;
      case 'History': return Icon64History;
      case 'Art': return Icon64Art;
      case 'Sport': return Icon64Sport;
      case 'Other': return Icon64Other;
      case 'Geography': return Icon64Geography;
      default: return '';
    }
  }

  return (
/*    <ModalPage
      className="EffectGPDetails"
      dynamicContentHeight
      settlingHeight={100}
      id={id}
      header={(
        <ModalPageHeader
          left={(
            <>
              {platform === ANDROID
              && (
                <PanelHeaderButton onClick={() => status.setIsActive(false)}>
                  <Icon24Cancel />
                </PanelHeaderButton>
              )}
            </>
          )}
          right={(
            <>
              {platform === IOS
              && (
                <PanelHeaderButton onClick={() => status.setIsActive(false)}>
                  <Icon24DismissDark />
                </PanelHeaderButton>
              )}
            </>
          )}
        >
          Прибыль GP
        </ModalPageHeader>
      )}
    >*/

      <div>
        <Cell
          multiline
          description="Сегодня Вы заработали 20 GP. Из них 18 GP принесли Ваши вопросы. Приобретайте больше вопросов в магазине, чтобы получать больше GP."
        />
        <Div style={{ paddingTop: '7px' }}>
          <SimpleCell
            disabled
            before={(
              <div
                className="EffectGPDetails--icon"
                style={{ backgroundImage: `url(${Icon48Brain})` }}
              />
            )}
            indicator="+2 GP"
          >
            Мозговой отчёт
          </SimpleCell>

          <Separator style={{ marginTop: '16px' }} wide />

          <Header
            style={{ padding: 0 }}
          >
            Прибыль с вопросов
          </Header>


        </Div>
      </div>
    // </ModalPage>
  );
};

EffectGPDetails.propTypes = {
/*  status: PropTypes.shape({
    isActive: PropTypes.bool,
    setIsActive: PropTypes.func,
  }).isRequired,
  id: PropTypes.string.isRequired,
  updateModalHeight: PropTypes.func,*/
};
EffectGPDetails.defaultProps = {};
export default EffectGPDetails;
