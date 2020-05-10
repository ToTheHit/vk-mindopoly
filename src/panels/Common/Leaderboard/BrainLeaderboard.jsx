import React, { useEffect, useState } from 'react';
import './brainLeaderboard.css';
import PropTypes from 'prop-types';

import {
  Button,
  Div, Group, Panel, PanelHeader, Placeholder, Tabs, TabsItem,
} from '@vkontakte/vkui';
import Icon24UserAddOutline from '@vkontakte/icons/dist/24/user_add_outline';

import bridge from '@vkontakte/vk-bridge';
import LeaderboardGallery from '../Components/LeaderboardGallery/LeaderboardGallery';

const BrainLeaderboard = (props) => {
  const { id } = props;
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
    bridge
      .send('VKWebAppGetUserInfo')
      .then((data) => {
        friendsArray.push({
          first_name: data.first_name,
          last_name: data.last_name,
          photo_200: data.photo_200,
          score: 0,
        });

        // Далее запрашиваем с сервера списки лидеров и раскидываем их по массивам.
        // Возможно нужна будет сортировка массива "Среди друзей"
        setFriendsLeaderboard(friendsArray);
      });

    // TODO: Для разработки. Удалить.
    setTimeout(() => {
      if (!friendsArray.length) {
        friendsArray.push({
          first_name: 'Test',
          last_name: 'User',
          photo_200: 'https://vk.com/images/deactivated_100.png?ava=1',
          score: 62,
        });
        setFriendsLeaderboard(friendsArray);
      }
    }, 1000);
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader>
        Мозгополисты
      </PanelHeader>
      <Group
        className="BrainLeaderboard"
/*        header={(
          <Header
            style={{ marginTop: '2px' }}
          >
            Мозгополисты
          </Header>
        )} */
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
          {(activeTab === 'FriendsLeaderboardTab' && (
            <Placeholder
              className="LeaderboardGallery__placeholder"
              icon={<Icon24UserAddOutline width={56} height={36} style={{ color: 'var(--button_primary_background)' }} />}
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
          ))}
        </Div>
      </Group>
    </Panel>

  );
};

BrainLeaderboard.propTypes = {
  id: PropTypes.string.isRequired,
};
BrainLeaderboard.defaultProps = {};
export default BrainLeaderboard;
