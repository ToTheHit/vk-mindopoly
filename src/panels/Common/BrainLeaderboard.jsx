import React, { useEffect, useState } from 'react';
import './brainLeaderboard.css';
import PropTypes from 'prop-types';

import {
  Div, Group, Header, Tabs, TabsItem,
} from '@vkontakte/vkui';
import LeaderboardGallery from './Components/LeaderboardGallery/LeaderboardGallery';

const BrainLeaderboard = (props) => {
  const { user } = props;
  const [worldLeaderboard, setWorldLeaderboard] = useState([
    {
      first_name: 'Test1',
      last_name: 'User1',
      photo_200: 'https://vk.com/images/deactivated_100.png?ava=1',
      score: 503,
    },
    {
      first_name: 'Test1',
      last_name: 'User1',
      photo_200: 'https://vk.com/images/deactivated_100.png?ava=1',
      score: 503,
    },
  ]);
  const [friendsLeaderboard, setFriendsLeaderboard] = useState([]);

  const [activeTab, setActiveTab] = useState('WorldLeaderboardTab');

  useEffect(() => {
    const friendsArray = [];
    friendsArray.push({
      first_name: user.first_name,
      last_name: user.last_name,
      photo_200: user.photo_200,
      score: user.BP,
    });
    // Далее запрашиваем с сервера списки лидеров и раскидываем их по массивам.
    // Возможно нужна будет сортировка массива "Среди друзей"
    setFriendsLeaderboard(friendsArray);
  }, []);

  return (
    <Group
      className="BrainLeaderboard"
      header={(
        <Header
          style={{ marginTop: '2px' }}
        >
          Мозгополисты
        </Header>
           )}
    >
      <Div style={{ paddingTop: 0 }}>

        <Group
          separator="hide"
        >
          <Tabs>
            <TabsItem
              selected={activeTab === 'WorldLeaderboardTab'}
              onClick={() => {
                setActiveTab('WorldLeaderboardTab');
              }}
            >
              Все игроки
            </TabsItem>
            <TabsItem
              selected={activeTab === 'FriendsLeaderboardTab'}
              onClick={() => {
                setActiveTab('FriendsLeaderboardTab');
              }}
            >
              Мои друзья
            </TabsItem>
          </Tabs>

          <LeaderboardGallery
            friendsLeaderboard={friendsLeaderboard}
            worldLeaderboard={worldLeaderboard}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </Group>

      </Div>

    </Group>
  );
};

BrainLeaderboard.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    photo_200: PropTypes.string,
    BP: PropTypes.number,
  }).isRequired,
};
BrainLeaderboard.defaultProps = {};
export default BrainLeaderboard;
