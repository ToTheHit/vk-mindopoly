import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Card,
  Gallery,
  PanelSpinner,
  Placeholder,
  Separator,
  SimpleCell,
} from '@vkontakte/vkui';
import Icon24UserAddOutline from '@vkontakte/icons/dist/24/user_add_outline';

import './leaderboardGallery.css';
import bridge from '@vkontakte/vk-bridge';

const LeaderboardGallery = (props) => {
  const {
    friendsLeaderboard, worldLeaderboard, activeTab, setActiveTab, spinnerIsActive,
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
    const rendered = friendsLeaderboard.map((item) => (
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
        {/* {index !== (friendsLeaderboard.length - 1) && <Separator wide />} */}
        <Separator wide />
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
    } else height = height * renderedFriendsLeaderboard.length + 275;

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
        {spinnerIsActive && <PanelSpinner size="small" />}
        <Placeholder
          className="LeaderboardGenius__placeholder"
          icon={(
            <Icon24UserAddOutline
              width={56}
              height={36}
              style={{ color: 'var(--button_primary_background)' }}
            />
          )}
          header="Пригласить друзей"
          action={(
            <Button
              size="l"
              onClick={() => bridge.send('VKWebAppShare', { link: 'https://vk.com/app7441788' })}
            >
              Пригласить
            </Button>
          )}
        >
          Проверьте, смогут ли Ваши друзья ответить на придуманные Вами вопросы.
        </Placeholder>
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
  spinnerIsActive: PropTypes.bool.isRequired,
};
LeaderboardGallery.defaultProps = {};
export default LeaderboardGallery;
