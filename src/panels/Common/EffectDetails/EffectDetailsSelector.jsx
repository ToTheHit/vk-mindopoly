import React, { useEffect, useState } from 'react';
import { ModalPage, ModalRoot, Separator } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import EffectGPDetailsContent from './EffectGPDetails/EffectGPDetailsContent';
import EffectDetailsHeader from './EffectDetailsHeader';
import EffectTaxDetailsContent from './EffectTaxDetails/EffectTaxDetailsContent';
import EffectCoinsDetailsContent from './EffectCoinsDetails/EffectCoinsDetailsContent';
import EffectMindopolistDetails from "./EffectMindopolistDetails/EffectMindopolistDetails";

const EffectDetailsSelector = () => {
  const [isActive, setIsActive] = useState(false);
  const mainViewModalName = useSelector((state) => state.mainViewModal.modalName);
  const dispatch = useDispatch();

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
