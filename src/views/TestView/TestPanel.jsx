import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, SimpleCell } from "@vkontakte/vkui";
import axios from "axios";
import globalVariables from "../../GlobalVariables";
import Shop from "../../panels/Common/Shop/Shop";

const TestPanel = (props) => {
  const { setActivePanel, id } = props;
  const [counter, setCounter] = useState(0);
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
      axios.get(`${globalVariables.serverURL}/api/allUserQuestions`, {
        params: {
          token: '9932fd5fc8d9ebf4a6959ae5d444cc6516f6a802fa3e58aec46614cbd0d1c9c6',
          id: '31818927',
        },
      })
      .then((data) => {


        setQuestions(data.data.attachment);

      })
      .catch((err) => {
        setTimeout(() => {
          console.error('Main, Get /api/', err);
        }, 1000);
      })
    // updateView();

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
      <div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>

{/*        <Mindbreakers
          setActivePanel={setActivePanel}
          questions={questions}

        />*/}
        <SimpleCell
          onClick={() => {
            setActivePanel('2')
          }}
        >
          Go to View #2
        </SimpleCell>
      </div>
    </Panel>

  )
};

TestPanel.propTypes = {
  setActivePanel: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,

};
TestPanel.defaultProps = {}
export default TestPanel;