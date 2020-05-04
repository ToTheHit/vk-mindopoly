import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './testView.css';
import {
  Gallery, Panel, PanelHeader, SimpleCell, View,
} from '@vkontakte/vkui';
import TestPanel from "./TestPanel";

const TestView = (props) => {
  const { id } = props;
  const [slideIndex, setSlideIndex] = useState(0);
  const [globalCounter, setGlobalCounter] = useState(0);


  const arr = [1,2];
  useEffect(() => {

  }, []);


  return (
    <View id={id} activePanel="1" className="TestView">
      <Panel id="1">
        <PanelHeader>
          Test View
        </PanelHeader>
        <Gallery
          style={{height: 'auto'}}
          slideWidth="100%"
          slideIndex={slideIndex}
          onChange={(index) => {
            setSlideIndex(index);
          }}
          align="center"
        >

          {arr.map((item, index) => {
            return (
              <TestPanel
                key={'TestGallery'+index}
                currentIndex={slideIndex}
                setGlobalCounter={setGlobalCounter}
                globalCounter={globalCounter}
              />
            )
          })}

        </Gallery>
      </Panel>
    </View>
  );
};

TestView.propTypes = {
  id: PropTypes.string.isRequired,
};
TestView.defaultProps = {};
export default TestView;
