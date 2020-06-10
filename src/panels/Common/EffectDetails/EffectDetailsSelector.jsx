import React, { useEffect, useState, useCallback } from 'react';
import {
  Div,
  ModalPage, ModalRoot, Separator, Text,
} from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import EffectGPDetailsContent from './EffectGPDetails/EffectGPDetailsContent';
import EffectDetailsHeader from './EffectDetailsHeader';
import EffectTaxDetailsContent from './EffectTaxDetails/EffectTaxDetailsContent';
import EffectCoinsDetailsContent from './EffectCoinsDetails/EffectCoinsDetailsContent';
import EffectMindopolistDetails from './EffectMindopolistDetails/EffectMindopolistDetails';
import EffectPioneerDetailsContent from './EffectPioneerDetails/EffectTaxDetailsContent';
import EffectMasterDetailsContent from "./EffectMasterDetails/EffectMasterDetailsContent";

const EffectDetailsSelector = () => {
  const [isActive, setIsActive] = useState(false);
  const mainViewModalName = useSelector((state) => state.mainViewModal.modalName);
  const dispatch = useDispatch();

  let closedByHardwareBackButton = false;
  const controlHardwareBackButton = useCallback(() => {
    setIsActive(false);
    closedByHardwareBackButton = true;
  }, [setIsActive]);

  useEffect(() => {
    if (!isActive) {
      dispatch({
        type: 'OPEN_MODAL',
        payload: null,
      });
    }
  }, [isActive]);

  useEffect(() => {
    if (mainViewModalName) setIsActive(true);
  }, [mainViewModalName]);


  useEffect(() => {
    if (isActive) {
      closedByHardwareBackButton = false;
      window.history.pushState({ page: `EffectDetails_${Math.random()}` }, 'EffectDetails', `${window.location.search}`);
      window.addEventListener('popstate', controlHardwareBackButton);
    } else {
      if (!closedByHardwareBackButton) {
        window.history.back();
      }
      window.removeEventListener('popstate', controlHardwareBackButton);
    }
  }, [isActive]);

  return (
    <ModalRoot
      activeModal={(isActive ? mainViewModalName : null)}
      onClose={() => {
        setIsActive(false);
      }}
    >
      <ModalPage
        id="TaxDetailsModalPage"
        header={<EffectDetailsHeader status={{ isActive, setIsActive }} text="Мозговой налог" />}
      >
        <Separator wide />
        <EffectTaxDetailsContent />
      </ModalPage>

      <ModalPage
        id="GPDetailsModalPage"
        header={<EffectDetailsHeader status={{ isActive, setIsActive }} text="Прибыль GP" />}
        dynamicContentHeight
      >
        <Separator wide />
        <EffectGPDetailsContent status={{
          isActive,
          setIsActive,
        }}
        />
      </ModalPage>

      <ModalPage
        id="CoinsDetailsModalPage"
        header={<EffectDetailsHeader status={{ isActive, setIsActive }} text="Дневной доход" />}
        dynamicContentHeight
      >
        <Separator wide />
        <EffectCoinsDetailsContent />
      </ModalPage>

      <ModalPage
        id="MindopolistDetailsModalPage"
        header={<EffectDetailsHeader status={{ isActive, setIsActive }} text="Мозгополист" />}
        dynamicContentHeight
      >
        <Separator wide />
        <EffectMindopolistDetails />
      </ModalPage>

      <ModalPage id="PioneerModalPage" header={<EffectDetailsHeader status={{ isActive, setIsActive }} text="Первопроходец" />}>
        <Separator wide />
        <EffectPioneerDetailsContent />
      </ModalPage>

      <ModalPage id="MasterModalPage" header={<EffectDetailsHeader status={{ isActive, setIsActive }} text="Магистр" />}>
        <Separator wide />
        <EffectMasterDetailsContent />
      </ModalPage>
    </ModalRoot>

  );
};

EffectDetailsSelector.propTypes = {};
EffectDetailsSelector.defaultProps = {};
export default EffectDetailsSelector;
