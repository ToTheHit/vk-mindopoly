import React from 'react';
import PropTypes from 'prop-types';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24DismissDark from '@vkontakte/icons/dist/24/dismiss_dark';
import {
  ANDROID,
  IOS,
  ModalPageHeader,
  PanelHeaderButton,
  Separator,
  usePlatform,
} from '@vkontakte/vkui';

const EffectDetailsHeader = (props) => {
  const platform = usePlatform();
  const { status, text } = props;

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
      {text}
    </ModalPageHeader>
  );
};

EffectDetailsHeader.propTypes = {
  status: PropTypes.shape({
    isActive: PropTypes.bool,
    setIsActive: PropTypes.func,
  }).isRequired,
  text: PropTypes.string.isRequired,
};
EffectDetailsHeader.defaultProps = {};
export default EffectDetailsHeader;
