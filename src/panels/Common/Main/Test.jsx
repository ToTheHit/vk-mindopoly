import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import globalVariables from '../../../GlobalVariables';

const TestMain = (props) => {
  const { id, setPopoutMainView } = props;
  const controlHardwareBackButton = useCallback(() => {
    console.info('TestMain', window.history.state);
  }, []);

  useEffect(() => {
    setPopoutMainView(false);
    // Алгоритм для обработки аппаратной кнопки "Назад" на андроидах
    if (window.history.state) {
      window.history.replaceState({ page: 'Shop' }, 'Shop', `${window.location.search}`);
    } else {
      window.history.pushState({ page: 'Shop' }, 'Shop', `${window.location.search}`);
    }
    window.addEventListener('popstate', controlHardwareBackButton);
    return () => {
      window.removeEventListener('popstate', controlHardwareBackButton);
    };
  }, []);

  return (
    <Panel id={id} className="TestMain">
      <PanelHeader>
        TestMain
      </PanelHeader>


    </Panel>
  );
};

TestMain.propTypes = {
  id: PropTypes.string.isRequired,
  setActiveStory: PropTypes.func.isRequired,
  setPopoutMainView: PropTypes.func,
};
TestMain.defaultProps = {
  setPopoutMainView: () => {},
};
export default TestMain;
