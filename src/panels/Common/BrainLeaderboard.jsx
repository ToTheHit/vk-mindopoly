import React, { useEffect, useState } from 'react';
import './brainLeaderboard.css';
import { Div, Group, Tabs, TabsItem, } from '@vkontakte/vkui';
import LeaderboardGallery from './Components/LeaderboardGallery/LeaderboardGallery';

const BrainLeaderboard = (props) => {
  const [worldLeaderboard, setWorldLeaderboard] = useState([
    {
      first_name: 'Test1',
      last_name: 'User1',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 503,
    },
  ]);
  const [friendsLeaderboard, setFriendsLeaderboard] = useState([
    {
      first_name: 'Test3',
      last_name: 'User3',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 1,
    },
    {
      first_name: 'Test4',
      last_name: 'User4',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 5,
    },

    {
      first_name: 'Test2',
      last_name: 'User2',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test5',
      last_name: 'User5',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
    {
      first_name: 'Test6',
      last_name: 'User6',
      photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
      score: 460,
    },
  ]);

  const [activeTab, setActiveTab] = useState('WorldLeaderboardTab');

  useEffect(() => {
    /*    // TODO: Этот send срабатывает до того, как сработает VKWebAppInit в index.js.
    setTimeout(() => {
      bridge.send('VKWebAppGetUserInfo', {}).then((data) => {setUser(data); console.log(data)});
    }, 100); */
  }, []);

  return (
    <div className="BrainLeaderboard">
      <Div style={{paddingTop: 0}}>

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
              В мире
            </TabsItem>
            <TabsItem
              selected={activeTab === 'FriendsLeaderboardTab'}
              onClick={() => {
                setActiveTab('FriendsLeaderboardTab');
              }}
            >
              Среди друзей
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

    </div>
  );
};

BrainLeaderboard.propTypes = {};
BrainLeaderboard.defaultProps = {};
export default BrainLeaderboard;
