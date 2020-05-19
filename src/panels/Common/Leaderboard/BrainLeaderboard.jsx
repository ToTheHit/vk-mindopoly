import React, { useCallback, useEffect, useState } from 'react';
import './brainLeaderboard.css';
import PropTypes from 'prop-types';

import {
  Cell,
  List,
  Panel,
  PanelHeader,
  PanelHeaderContent,
  PanelHeaderContext,
} from '@vkontakte/vkui';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon28BrainOutline from '@vkontakte/icons/dist/28/brain_outline';
import Icon28GridSquareOutline from '@vkontakte/icons/dist/28/grid_square_outline';
import LeaderboardGenius from './Components/LeaderboardGenius/LeaderboardGenius';
import LeaderboardCategories from './Components/LeaderboardCategories/LeaderboardCategories';
import globalVariables from '../../../GlobalVariables';

const BrainLeaderboard = (props) => {
  const { id, setActiveStory } = props;
  const [contextIsOpened, setContextIsOpened] = useState(false);
  const [ratingType, setRatingType] = useState('score');

  const controlHardwareBackButton = useCallback(() => {
      setActiveStory(globalVariables.commonView.roots.main);
  }, []);
  useEffect(() => {
    // Алгоритм для обработки аппаратной кнопки "Назад" на андроидах
    window.history.pushState({ page: 'Leaderboard' }, 'Leaderboard', `${window.location.search}`);
    window.addEventListener('popstate', controlHardwareBackButton);
    return () => {
      window.removeEventListener('popstate', controlHardwareBackButton);
    };
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent
          onClick={() => {
            setContextIsOpened(!contextIsOpened);
          }}
          aside={(
            <Icon16Dropdown
              width={20}
              height={16}
              className="BrainLeaderboard--icon BrainLeaderboard__panelHeader--icon"
              style={{
                marginLeft: '4px',
                transform: `rotate(${contextIsOpened ? '180deg' : '0'})`,
              }}
            />
          )}
        >
          Лидеры
        </PanelHeaderContent>
      </PanelHeader>
      <PanelHeaderContext opened={contextIsOpened} onClose={() => setContextIsOpened(false)}>
        <List>
          <Cell
            before={<Icon28BrainOutline className="BrainLeaderboard--icon" />}
            asideContent={ratingType === 'score'
              ? <Icon24Done className="BrainLeaderboard--icon" /> : null}
            onClick={() => {
              setRatingType('score');
              setContextIsOpened(false);
            }}
          >
            По очкам гения
          </Cell>
          <Cell
            before={<Icon28GridSquareOutline className="BrainLeaderboard--icon" />}
            asideContent={ratingType === 'categories'
              ? <Icon24Done className="BrainLeaderboard--icon" /> : null}
            onClick={() => {
              setRatingType('categories');
              setContextIsOpened(false);
            }}
          >
            По категориям
          </Cell>
        </List>
      </PanelHeaderContext>

      <div
        className="BrainLeaderboard"
      >
        {(ratingType === 'score' && (
          <LeaderboardGenius />
        ))}
        {(ratingType === 'categories' && (
          <LeaderboardCategories />
        ))}
      </div>
    </Panel>

  );
};

BrainLeaderboard.propTypes = {
  id: PropTypes.string.isRequired,
  setActiveStory: PropTypes.func.isRequired,
};
BrainLeaderboard.defaultProps = {};
export default BrainLeaderboard;
