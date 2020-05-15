import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Card, Gallery, Separator, SimpleCell,
} from '@vkontakte/vkui';

import './leaderboardGallery.css';

const LeaderboardGallery = (props) => {
  const {
    friendsLeaderboard, worldLeaderboard, activeTab, setActiveTab,
  } = props;

  const [slideIndex, setSlideIndex] = useState(0);
  // const [activeTab, setActiveTab] = useState('WorldLeaderboardTab');
  const [renderedFriendsLeaderboard, setRenderedFriendsLeaderBoard] = useState([]);
  const [renderedWorldLeaderboard, setRenderedWorldLeaderboard] = useState([]);
  const [cardHeight, setCardHeight] = useState(0);

  useEffect(() => {
    if (activeTab === 'WorldLeaderboardTab') setSlideIndex(0);
    else if (activeTab === 'FriendsLeaderboardTab') setSlideIndex(1);
  }, [activeTab]);

  useEffect(() => {
    const rendered = friendsLeaderboard.map((item, index) => (
      <div
        key={Math.random()}
      >
        <SimpleCell
          disabled
          before={<Avatar size={48} src={item.photo} />}
          indicator={`${item.bp} GP`}
        >
          {`${item.first_name} `}
          <b>{item.last_name}</b>
        </SimpleCell>
        {index !== (friendsLeaderboard.length - 1) && <Separator wide />}
      </div>
    ));
    setRenderedFriendsLeaderBoard(rendered);
  }, [friendsLeaderboard]);


  useEffect(() => {
    const rendered = worldLeaderboard.map((item, index) => (
      <div
        key={Math.random()}
      >
        <SimpleCell
          disabled
          before={<Avatar size={48} src={item.photo} />}
          indicator={`${item.bp} GP`}
        >
          {`${item.first_name} `}
          <b>{item.last_name}</b>
        </SimpleCell>
        {index !== (worldLeaderboard.length - 1) && <Separator wide />}
      </div>
    ));
    setRenderedWorldLeaderboard(rendered);
  }, [worldLeaderboard]);

  useEffect(() => {
    let height = 61;

    if (activeTab === 'WorldLeaderboardTab') {
      height *= renderedWorldLeaderboard.length;
    } else height *= renderedFriendsLeaderboard.length;

    setCardHeight(height);
  }, [activeTab, renderedFriendsLeaderboard, renderedWorldLeaderboard]);

  return (
    <Gallery
      slideWidth="100%"
      slideIndex={slideIndex}
      onChange={(i) => {
        setSlideIndex(i);
        if (i === 0) {
          setActiveTab('WorldLeaderboardTab');
        }
        if (i === 1) {
          setActiveTab('FriendsLeaderboardTab');
        }
      }}
      align="center"
      style={{ height: cardHeight }}
    >

      <Card
        mode="shadow"
        className="LeaderboardGallery--card"
        style={{ height: 'auto' }}
      >
        {renderedWorldLeaderboard}
      </Card>
      <Card
        mode="shadow"
        style={{ height: 'auto' }}
        className="LeaderboardGallery--card"
      >
        {renderedFriendsLeaderboard}
      </Card>
    </Gallery>
  );
};

LeaderboardGallery.propTypes = {
  friendsLeaderboard: PropTypes.arrayOf(PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    photo: PropTypes.string,
    bp: PropTypes.number,
  })).isRequired,
  worldLeaderboard: PropTypes.arrayOf(PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    photo: PropTypes.string,
    bp: PropTypes.number,
  })).isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};
LeaderboardGallery.defaultProps = {};
export default LeaderboardGallery;
