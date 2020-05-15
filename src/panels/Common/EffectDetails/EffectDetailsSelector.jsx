import React, { useEffect, useState } from 'react';
import { ModalPage, ModalRoot } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import EffectGPDetailsContent from './EffectGPDetails/EffectGPDetailsContent';
import EffectGPDetailsHeader from './EffectGPDetails/EffectGPDetailsHeader';

const EffectDetailsSelector = (props) => {
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
        id="GPDetailsModalPage"
        header={<EffectGPDetailsHeader status={{ isActive, setIsActive }} />}
        dynamicContentHeight
      >
        <EffectGPDetailsContent status={{
          isActive,
          setIsActive,
        }}
        />
      </ModalPage>
    </ModalRoot>

  );
};

EffectDetailsSelector.propTypes = {};
EffectDetailsSelector.defaultProps = {};
export default EffectDetailsSelector;
