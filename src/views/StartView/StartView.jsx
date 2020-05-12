import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';
import StartPanel from '../../panels/StartPanel/StartPanel';

const StartView = (props) => {
  const { id, nextView } = props;
  const [activePanel, setActivePanel] = useState('StartPanel');
  const [popout, setPopout] = useState(/* <ScreenSpinner size="large" /> */);

  return (
    <View
      id={id}
      activePanel={activePanel}
      popout={popout}
      header={false}
      style={{ position: 'fixed', top: '-2px' }}
    >
      <StartPanel id="StartPanel" nextView={nextView} />
    </View>
  );
};

StartView.propTypes = {
  id: PropTypes.string.isRequired,
  nextView: PropTypes.func.isRequired,
};
StartView.defaultProps = {};
export default StartView;
