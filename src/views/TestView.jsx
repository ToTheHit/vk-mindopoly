import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './testView.css';
import {
  Gallery, Panel, PanelHeader, SimpleCell, View,
} from '@vkontakte/vkui';

const TestView = (props) => {
  const { id } = props;
  const [slideIndex, setSlideIndex] = useState(0);
  const slideContent1 = (
    <div>
      <div>1</div>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
    </div>
  );
  const slideContent2 = (
    <div>
      <div>1</div>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
      <SimpleCell>1</SimpleCell>
    </div>
  );

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
          <Panel id="testGallery-1">
            {slideContent1}
          </Panel>
          <Panel id="testGallery-2">
            {slideContent2}
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
