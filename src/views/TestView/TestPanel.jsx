import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, SimpleCell } from "@vkontakte/vkui";
import axios from "axios";
import globalVariables from "../../GlobalVariables";
import Shop from "../../panels/Common/Shop/Shop";
import './testView.css';
import ProgressRing from "../../panels/CustomComponents/ProgressRing/ProgressRing";
import WorkViewModal from "../WorkView/WorkViewModal";

const TestPanel = (props) => {
  const { setActivePanel, id } = props;
  const [counter, setCounter] = useState(0);
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    setTimeout(() => {
      console.info('redirect');
      // window.location.replace = 'https://vk.com/tothehit';
    }, 3000);
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader>
        Development View #1
      </PanelHeader>
      <SimpleCell
        onClick={() => {
          setActivePanel('2')
        }}
      >
        Go to View #2
      </SimpleCell>
      <ProgressRing
        radius={34}
        stroke={5}
        initialStrokeDashoffest={151}
        progress={-70}
        stokeColor={'red'}
      />
      <a target="_blank" rel="noopener noreferrer" href="https://vk.com/tothehit">Link</a>

    </Panel>

  )
};

TestPanel.propTypes = {
  setActivePanel: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,

};
TestPanel.defaultProps = {}
export default TestPanel;