import React, { useEffect, useState, useCallback } from 'react';
import { ModalPage, ModalRoot, Separator } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import EffectGPDetailsContent from './EffectGPDetails/EffectGPDetailsContent';
import EffectDetailsHeader from './EffectDetailsHeader';
import EffectTaxDetailsContent from './EffectTaxDetails/EffectTaxDetailsContent';
import EffectCoinsDetailsContent from './EffectCoinsDetails/EffectCoinsDetailsContent';
import EffectMindopolistDetails from './EffectMindopolistDetails/EffectMindopolistDetails';
import globalVariables from '../../../GlobalVariables';

const EffectDetailsSelector = () => {
  const [isActive, setIsActive] = useState(false);
  const mainViewModalName = useSelector((state) => state.mainViewModal.modalName);
  const dispatch = useDispatch();

  const controlHardwareBackButton = useCallback(() => {

    setIsActive(false);
  }, []);

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
      if (!window.history.state) {
        window.history.pushState({ page: 'EffectDetails' }, 'EffectDetails', `${window.location.search}`);
      } else {
        window.history.replaceState({ page: 'EffectDetails' }, 'EffectDetails', `${window.location.search}`);
      }
      window.addEventListener('popstate', controlHardwareBackButton);
    } else {
      window.removeEventListener('popstate', controlHardwareBackButton);
      // window.history.back();
    }
  }, [isActive]);

  return (
    <ModalRoot
      activeModal={(isActive ? mainViewModalName : null)}
      onClose={() => setIsActive(false)}
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
    </ModalRoot>

  );
};

EffectDetailsSelector.propTypes = {};
EffectDetailsSelector.defaultProps = {};
export default EffectDetailsSelector;
