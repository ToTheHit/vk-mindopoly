import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Card, Gallery, Group, Separator, SimpleCell,
} from '@vkontakte/vkui';

const LeaderboardGallery = (props) => {
  const { friendsLeaderboard, worldLeaderboard } = props;
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('WorldLeaderboardTab');
  const [renderedFriendsLeaderboard, setRenderedFriendsLeaderBoard] = useState([]);
  const [renderedWorldLeaderboard, setRenderedWorldLeaderboard] = useState([]);


  useEffect(() => {
    const rendered = friendsLeaderboard.map((item, index) => (
      <div
        key={Math.random()}
      >
        <SimpleCell
          disabled
          before={<Avatar size={48} src={item.photo_200} />}
          indicator={`${item.score} BR`}
        >
          {`${item.first_name} `}
          <b>{item.last_name}</b>
        </SimpleCell>
        {index !== (worldLeaderboard.length - 1) && <Separator wide />}
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
          before={<Avatar size={48} src={item.photo_200} />}
          indicator={`${item.score} BR`}
        >
          {`${item.first_name} `}
          <b>{item.last_name}</b>
        </SimpleCell>
        {index !== (worldLeaderboard.length - 1) && <Separator wide />}
      </div>
    ));
    setRenderedWorldLeaderboard(rendered);
  }, [worldLeaderboard]);

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
      style={{ height: 61 * (activeTab === 'WorldLeaderboardTab' ? renderedWorldLeaderboard.length : renderedFriendsLeaderboard.length) }}
    >
      <Card
        mode="shadow"
        style={{ height: 'auto' }}
      >
        {renderedWorldLeaderboard}
{/*        {worldLeaderboard.map((item, index) => (
          <div
            key={Math.random()}
          >
            <SimpleCell
              disabled
              before={<Avatar size={48} src={item.photo_200} />}
              indicator={`${item.score} BR`}
            >
              {`${item.first_name} `}
              <b>{item.last_name}</b>
            </SimpleCell>
            {index !== (worldLeaderboard.length - 1) && <Separator wide />}
          </div>
        ))}*/}
      </Card>
      <Card
        mode="shadow"
        style={{ height: 'auto' }}
      >
        {console.log('1')}
        {renderedFriendsLeaderboard}
        {/*{friendsLeaderboard.map((item, index) => (
          <div
            key={Math.random()}
          >
            <SimpleCell
              disabled
              before={<Avatar size={48} src={item.photo_200} />}
              indicator={`${item.score} BR`}
            >
              {`${item.first_name} `}
              <b>{item.last_name}</b>
            </SimpleCell>
            {index !== (friendsLeaderboard.length - 1) && <Separator wide />}
          </div>
        ))}*/}
      </Card>
    </Gallery>
  );
};

LeaderboardGallery.propTypes = {
  friendsLeaderboard: PropTypes.arrayOf(PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    photo_200: PropTypes.string,
    score: PropTypes.number,
  })).isRequired,
  worldLeaderboard: PropTypes.arrayOf(PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    photo_200: PropTypes.string,
    score: PropTypes.number,
  })).isRequired,
};
LeaderboardGallery.defaultProps = {};
export default LeaderboardGallery;
