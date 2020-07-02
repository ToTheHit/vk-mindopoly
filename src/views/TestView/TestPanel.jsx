import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, SimpleCell } from '@vkontakte/vkui';
import axios from 'axios';
import globalVariables from '../../GlobalVariables';
import Shop from '../../panels/Common/Shop/Shop';
import './testView.css';
import ProgressRing from '../../panels/CustomComponents/ProgressRing/ProgressRing';
import WorkViewModal from '../WorkView/WorkViewModal';

const TestPanel = (props) => {
  const { setActivePanel, id } = props;
  const [counter, setCounter] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [stop, setStop] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      console.info('redirect');
      // window.location.replace = 'https://vk.com/tothehit';
    }, 3000);
  }, []);

  function redirect() {
    console.info('test');
    window.open('https://vk.com/tothehit', '_blank');
  }

  function openInNewTab(url) {
    const win = window.open(url, '_blank');
    console.info(win);
    if (win != null) {
      win.focus();
    }
  }

  function makeHref() {
    return null;
  }

  useEffect(() => {
    setTimeout(() => {
      setStop(true);
    }, 5000);
  }, []);
  const makeHref1 = useCallback(() => {
    if (stop) return 'https://vk.com/tothehit';
    return null;
  }, [stop]);

  return (
    <Panel id={id}>
      <PanelHeader>
        Development View #1
      </PanelHeader>
      <SimpleCell
        onClick={() => {
          setActivePanel('2');
        }}
      >
        Go to View #2
      </SimpleCell>
      {stop}
      <ProgressRing
        radius={34}
        stroke={5}
        initialStrokeDashoffest={151}
        progress={-70}
        stokeColor="red"
      />

      {/*      <div onClick={() => openInNewTab('https://vk.com/tothehit')}>
        Link
      </div> */}
      <a target="_blank" rel="noopener noreferrer" href={makeHref1()}>Link</a>

    </Panel>

  );
};

TestPanel.propTypes = {
  setActivePanel: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,

};
TestPanel.defaultProps = {};
export default TestPanel;
