import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, SimpleCell } from "@vkontakte/vkui";

const TestPanel = (props) => {
  const { setActivePanel, id } = props;
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log('update test panel #1!');
  }, [])
  return (
    <Panel id={id}>
      <PanelHeader>
        Development View #1
      </PanelHeader>
      <SimpleCell
        onClick={() => {
          setActivePanel('Main1')
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
        <SimpleCell
          onClick={() => {
            setActivePanel('2')
          }}
        >
          Go to View #2
        </SimpleCell>
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