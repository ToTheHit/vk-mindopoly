import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Panel } from "@vkontakte/vkui";

const TestPanel = (props) => {
  const {currentIndex, globalCounter, setGlobalCounter} = props;
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log('update!');
  }, [])
  return (
    <Panel className={'TestPanel'} id={Math.random()}
      onClick={() => {
        setCounter(counter + 1);
        setGlobalCounter(globalCounter + 1);
      }}
    >
      {`Counter: ${counter}`}
      <br/>
      {`Current index: ${currentIndex}`}
      <br/>
      {`Global counter: ${globalCounter}`}
    </Panel>
  )
};

TestPanel.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  globalCounter: PropTypes.number.isRequired,
  setGlobalCounter: PropTypes.func.isRequired,
};
TestPanel.defaultProps = {}
export default TestPanel;