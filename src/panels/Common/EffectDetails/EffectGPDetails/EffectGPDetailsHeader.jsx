import React from 'react';
import PropTypes from 'prop-types';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24DismissDark from '@vkontakte/icons/dist/24/dismiss_dark';
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

const EffectGPDetailsHeader = (props) => {
  const platform = usePlatform();
  const {status} = props;

  return (
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
  )
};

EffectGPDetailsHeader.propTypes = {
  status: PropTypes.shape({
    isActive: PropTypes.bool,
    setIsActive: PropTypes.func,
  }).isRequired,
};
EffectGPDetailsHeader.defaultProps = {}
export default EffectGPDetailsHeader;