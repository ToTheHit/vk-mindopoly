import React, { useEffect, useState } from 'react';
import './leaderboardGenius.css';
import {
  Button, Div, Group, PanelSpinner, Placeholder, Tabs, TabsItem,
} from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import Icon24UserAddOutline from '@vkontakte/icons/dist/24/user_add_outline';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LeaderboardGallery from '../../../Components/LeaderboardGallery/LeaderboardGallery';
import globalVariables from '../../../../../GlobalVariables';

const qs = require('querystring');

const LeaderboardGenius = () => {
  const [activeTab, setActiveTab] = useState('WorldLeaderboardTab');
  const [spinnerIsActive, setSpinnerIsActive] = useState(true);
  const [worldLeaderboard, setWorldLeaderboard] = useState([]);
  const [friendsLeaderboard, setFriendsLeaderboard] = useState([]);
  const userTokens = useSelector((state) => state.userToken);

  function getLeaderboardFromServer(VKfriendsArray) {
    return new Promise((resolve, reject) => {
      const urlParams = new URLSearchParams(window.location.search);
      // console.info(urlParams.get('vk_user_id'));
      const requestBody = {
        friends: [urlParams.get('vk_user_id'), ...VKfriendsArray],
        id: urlParams.get('vk_user_id'),
      };
      axios.post(`${globalVariables.serverURL}/api/leaderBoard`, qs.stringify(requestBody), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((data) => {
          // console.info(data.data.attachment);
          resolve(data.data.attachment);
        })
        .catch((err) => reject(err));
    });
  }

  function getFriends() {
    return new Promise((resolve) => {
      bridge.send('VKWebAppCallAPIMethod', {
        method: 'friends.getAppUsers',
        params: {
          v: '5.103',
          access_token: `${localStorage.getItem(globalVariables.friendsAccessToken)}`,
        },
      })
        .then((friendsData) => resolve(friendsData.response))
        .catch((error) => {
          console.info('errorFriends', error);
          if (error.error_data.error_code === 5) {
            bridge.send('VKWebAppGetAuthToken', { app_id: 7441788, scope: 'friends' })
              .then((data) => {
                localStorage.setItem(globalVariables.friendsAccessToken, data.access_token);
                resolve(getFriends());
              });
          } else resolve([]);
        });
    });
  }

  useEffect(() => {
    if (userTokens.token) {
      if (localStorage.getItem(globalVariables.friendsAccessToken)) {
        getFriends()
          .then((friends) => {
            getLeaderboardFromServer(friends)
              .then((leaderboard) => {
                setSpinnerIsActive(false);
                setWorldLeaderboard(leaderboard.global);
                setFriendsLeaderboard(leaderboard.friends);
              })
              .catch((error) => {
                console.info('Error post /api/leaderboard', error);
              });
          });
      } else {
        getLeaderboardFromServer([])
          .then((leaderboard) => {
            setSpinnerIsActive(false);
            setWorldLeaderboard(leaderboard.global);
            setFriendsLeaderboard(leaderboard.friends);
          });
      }
    } else {
      // nextView
      getLeaderboardFromServer([])
        .then((leaderboard) => {
          setSpinnerIsActive(false);
          setWorldLeaderboard(leaderboard.global);
          setFriendsLeaderboard(leaderboard.friends);
        });
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'FriendsLeaderboardTab' && localStorage.getItem(globalVariables.friendsAccessToken)) {
      /*      setSpinnerIsActive(true);
      bridge.send('VKWebAppCallAPIMethod', {
        method: 'friends.getAppUsers',
        params: {
          v: '5.103',
          access_token: `${localStorage.getItem(globalVariables.friendsAccessToken)}`,
        },
      })
        .then((friendsData) => {
          getLeaderboardFromServer(friendsData.response)
            .then((leaderboard) => {
              setSpinnerIsActive(false);
              setWorldLeaderboard(leaderboard.global);
              setFriendsLeaderboard(leaderboard.friends);
            });
        })
        .catch((errorFriend) => console.error('errorFriends', errorFriend)); */

      /*      bridge.send('VKWebAppGetAuthToken', { app_id: 7441788, scope: 'friends' })
        .then((data) => {
          localStorage.setItem(globalVariables.friendsAccessToken, data.access_token);

          bridge.send('VKWebAppCallAPIMethod', {
            method: 'friends.getAppUsers',
            params: {
              v: '5.103',
              access_token: `${data.access_token}`,
            },
          })
            .then((friendsData) => {
              getLeaderboardFromServer(friendsData.response)
                .then((leaderboard) => {
                  setSpinnerIsActive(false);
                  setWorldLeaderboard(leaderboard.global);
                  setFriendsLeaderboard(leaderboard.friends);
                });
            })
            .catch((errorFriend) => console.error('errorFriends', errorFriend));
        })
        .catch((err) => {
          console.info(err);
          setSpinnerIsActive(false);
        }); */
    }
  }, [activeTab]);


  function getFriendsAccess() {
    bridge.send('VKWebAppGetAuthToken', { app_id: 7441788, scope: 'friends' })
      .then((data) => {

        bridge.send('VKWebAppCallAPIMethod', {
          method: 'friends.getAppUsers',
          params: {
            v: '5.103',
            access_token: `${data.access_token}`,
          },
        })
          .then((friendsData) => {
            setSpinnerIsActive(true);
            localStorage.setItem(globalVariables.friendsAccessToken, data.access_token);
            getLeaderboardFromServer(friendsData.response)
              .then((leaderboard) => {
                setSpinnerIsActive(false);
                setWorldLeaderboard(leaderboard.global);
                setFriendsLeaderboard(leaderboard.friends);
              });
          })
          .catch((errorFriend) => {
            localStorage.removeItem(globalVariables.friendsAccessToken);
            console.error('errorFriends', errorFriend);
          });
      })
      .catch((err) => {
        console.info(err);
        setSpinnerIsActive(false);
      });
  }
  return (
    <div className="LeaderboardGenius">

      <Group
        separator="hide"
      >
        <Div style={{ paddingTop: 0, paddingBottom: 0 }}>
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

        </Div>
        {(spinnerIsActive && activeTab !== 'FriendsLeaderboardTab') && <PanelSpinner size="small" />}

        <LeaderboardGallery
          friendsLeaderboard={friendsLeaderboard}
          worldLeaderboard={worldLeaderboard}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          spinnerIsActive={spinnerIsActive}
          getFriendsAccess={getFriendsAccess}
        />

      </Group>
    </div>
  );
};

LeaderboardGenius.propTypes = {};
LeaderboardGenius.defaultProps = {};
export default LeaderboardGenius;
