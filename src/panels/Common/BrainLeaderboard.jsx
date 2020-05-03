import React, { useEffect, useState } from 'react';
import './brainLeaderboard.css';
import {
  Avatar, Cell, Div, Group, Headline, Tabs, TabsItem,
} from '@vkontakte/vkui';
import LeaderboardGallery from './Components/LeaderboardGallery';

const BrainLeaderboard = (props) => {
  const [BR, setBR] = useState(62);

  const [fetchedUser, setUser] = useState({
    first_name: 'Test',
    last_name: 'User',
    photo_200: 'https://sun9-51.userapi.com/c840222/v840222319/8a733/I7rD4NcI9N0.jpg?ava=1',
  });
  const [userLeaderboardData, setUserLeaderboardData] = useState({
    worldPlace: 12803312,
    friendsPlace: 4,
  });
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
  const [slideIndex, setSlideIndex] = useState(0);
  const [galleryHeight, setGalleryHeight] = useState(0);

  useEffect(() => {
    // bridge.send('VKWebAppGetUserInfo', {}).then((data) => setUser(data));
    setGalleryHeight(62 * worldLeaderboard.length);

    /*    // TODO: Этот send срабатывает до того, как сработает VKWebAppInit в index.js.
    setTimeout(() => {
      bridge.send('VKWebAppGetUserInfo', {}).then((data) => {setUser(data); console.log(data)});
    }, 100); */
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (activeTab === 'WorldLeaderboardTab') setGalleryHeight(62 * worldLeaderboard.length);
      else if (activeTab === 'FriendsLeaderboardTab') setGalleryHeight(62 * friendsLeaderboard.length);
    }, 200);
  }, [activeTab]);

  return (
    <div className="BrainLeaderboard">
      <Div>
        <Headline level={2} weight="semibold">Брейн-рейтинг</Headline>
        {fetchedUser && (
          <Group
            separator="hide"
            description={(
              <div>
                {`Вы на ${userLeaderboardData.worldPlace.toLocaleString()} месте в мире 
              и на ${userLeaderboardData.friendsPlace.toLocaleString()} месте среди друзей. Чтобы
              автоматически получать очки брейн-рейтинга, купите в магазине «Вопрос».`}
              </div>
            )}
          >
            <Cell
              before={<Avatar src={fetchedUser.photo_200} />}
              indicator={<div>{`${BR} BR`}</div>}
            >
              {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
            </Cell>
          </Group>
        )}
        <Group
          separator="hide"
        >
          <Tabs>
            <TabsItem
              selected={activeTab === 'WorldLeaderboardTab'}
              onClick={() => {
                setActiveTab('WorldLeaderboardTab');
                setSlideIndex(0);
              }}
            >
              В мире
            </TabsItem>
            <TabsItem
              selected={activeTab === 'FriendsLeaderboardTab'}
              onClick={() => {
                setActiveTab('FriendsLeaderboardTab');
                setSlideIndex(1);
              }}
            >
              Среди друзей
            </TabsItem>
          </Tabs>

          {/*          <Card
            mode="shadow"
            style={{ height: 'auto' }}
            // eslint-disable-next-line max-len
            className={classNames({ 'BrainLeaderboard--hidden': activeTab !== 'WorldLeaderboardTab' })}
          >
            {worldLeaderboard.map((item, index) => (
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
            ))}
          </Card>
          <Card
            mode="shadow"
            style={{ height: 'auto' }}
            className={classNames({ 'BrainLeaderboard--hidden': activeTab !== 'FriendsLeaderboardTab' })}
          >
            {friendsLeaderboard.map((item, index) => (
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

            ))}
          </Card> */}
          <LeaderboardGallery
            friendsLeaderboard={friendsLeaderboard}
            worldLeaderboard={worldLeaderboard}
          />
        </Group>

      </Div>

    </div>
  );
};

BrainLeaderboard.propTypes = {};
BrainLeaderboard.defaultProps = {};
export default BrainLeaderboard;
