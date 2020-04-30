import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Panel, Gallery } from '@vkontakte/vkui';
import { useSelector } from 'react-redux';

import './startView.css';

import Start1 from './Start1';
import Start2 from './Start2';

const StartView = (props) => {
  const { id } = props;

  const [slideIndex, setSlideIndex] = useState(0);
  const store = useSelector((state) => state);

  return (
    <Panel id={id} className="StartView">
      <Gallery
        slideWidth="100%"
        style={{ height: '100vh' }}
        bullets={((store.schemeChanger.scheme === 'bright_light') || (store.schemeChanger.scheme === 'client_light') ? 'dark' : 'light')}
        className="Start1--gallery"
        slideIndex={slideIndex}
        onChange={(index) => setSlideIndex(index)}
      >
        <Start1 id="StartView-page-1" goToNextSlide={setSlideIndex} />
        <Start2 id="StartView-page-2" />
      </Gallery>

    </Panel>
  );
};

StartView.propTypes = {
  id: PropTypes.string.isRequired,
  // go: PropTypes.func.isRequired,
};

export default StartView;
