import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './testView.css';
import {
  Gallery, Panel, PanelHeader, View,
} from '@vkontakte/vkui';

const TestView = (props) => {
  const { id } = props;
  const firstPanelRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const fisrPanel = (
    <div ref={firstPanelRef}>
      <Panel>3</Panel>
    </div>
  );

  useEffect(() => {
    console.log(firstPanelRef.current.parentNode.parentNode.parentNode);
    firstPanelRef.current.childNodes[0].childNodes[0].addEventListener('touchmove', (event) => {
      event.stopPropagation();
    });
    setTimeout(() => {
      console.log('111');
      setSlideIndex(1);
    }, 5000);
  }, []);


  return (
    <View id={id} activePanel="1" className="TestView">
      <Panel id="1">
        <PanelHeader>
          Test View
        </PanelHeader>
        <Gallery
          slideWidth="100%"
          slideIndex={slideIndex}
          onChange={(index) => {
            setSlideIndex(index);
          }}
          align="center"
        >
          {fisrPanel}
          <Panel id="testGallery-1">
            1
          </Panel>
          <Panel id="testGallery-2">
            2
          </Panel>

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
