import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Panel, Gallery } from '@vkontakte/vkui';
import { useSelector } from 'react-redux';

import './startPanel.css';

import StartPanel1 from './Components/StartPanel1';
import StartPanel2 from './Components/StartPanel2';

const StartPanel = (props) => {
  const { id } = props;

  const [slideIndex, setSlideIndex] = useState(0);
  const scheme = useSelector((state) => state.schemeChanger.scheme);

  return (
    <Panel id={id} className="StartPanel">
      <Gallery
        slideWidth="100%"
        style={{ height: '100vh' }}
        bullets={((scheme === 'bright_light') || (scheme === 'client_light') ? 'dark' : 'light')}
        className="Start1--gallery"
        slideIndex={slideIndex}
        onChange={(index) => setSlideIndex(index)}
      >
        <StartPanel1 id="StartPanel-page-1" goToNextSlide={setSlideIndex} />
        <StartPanel2 id="StartPanel-page-2" />
      </Gallery>

    </Panel>
  );
};

StartPanel.propTypes = {
  id: PropTypes.string.isRequired,
  // go: PropTypes.func.isRequired,
};

export default StartPanel;
