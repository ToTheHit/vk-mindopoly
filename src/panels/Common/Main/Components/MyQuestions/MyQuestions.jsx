import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './myQuestions.css';
import {
  Button, Caption, Group, Header, Placeholder, SimpleCell,
} from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import Icon28MarketOutline from '@vkontakte/icons/dist/28/market_outline';
import Icon64Math from '../../../../../assets/Icons/icn64_math.png';
import Icon64Russian from '../../../../../assets/Icons/icn64_rus.png';
import Icon64Litra from '../../../../../assets/Icons/icn64_litra.png';
import Icon64Physics from '../../../../../assets/Icons/icn64_physics.png';
import Icon64Chemistry from '../../../../../assets/Icons/icn64_chem.png';
import Icon64Astro from '../../../../../assets/Icons/icn64_astro.png';
import Icon64Biology from '../../../../../assets/Icons/icn64_bio.png';
import Icon64History from '../../../../../assets/Icons/icn64_history.png';
import Icon64Art from '../../../../../assets/Icons/icn64_art.png';
import Icon64Sport from '../../../../../assets/Icons/icn64_sport.png';
import Icon64Other from '../../../../../assets/Icons/icn64_other.png';
import Icon64Geography from '../../../../../assets/Icons/icn64_geography.png';
import globalVariables from '../../../../../GlobalVariables';

const MyQuestions = (props) => {
  const { setActivePanel, setActiveStory } = props;
  const dispatch = useDispatch();
  const availableCategories = useSelector((state) => Object.keys(state.userQuestions.questions)
    .map((key) => ({ category: key, length: state.userQuestions.questions[key].length }))
    .filter((item) => item.length > 0));

  function getCorrectWord(count) {
    const cases = [2, 0, 1, 1, 1, 2];
    return ['вопрос', 'вопроса', 'вопросов'][(count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5]];
  }

  function getIcon(category) {
    switch (category) {
      case 'Math':
        return Icon64Math;
      case 'Russian':
        return Icon64Russian;
      case 'Literature':
        return Icon64Litra;
      case 'Physics':
        return Icon64Physics;
      case 'Chemistry':
        return Icon64Chemistry;
      case 'Astronomy':
        return Icon64Astro;
      case 'Biology':
        return Icon64Biology;
      case 'History':
        return Icon64History;
      case 'Art':
        return Icon64Art;
      case 'Sport':
        return Icon64Sport;
      case 'Other':
        return Icon64Other;
      case 'Geography':
        return Icon64Geography;
      default:
        return '';
    }
  }

  const categoriesMemo = useMemo(() => {
    if (availableCategories.length > 0) {
      return availableCategories.map((item) => {
        if (item.category === 'All') return null;
        return (
          <SimpleCell
            className="MyQuestions__categoryRow"
            key={`MyQuestions_Category_${item.category}`}
            expandable
            before={(
              <div
                className="MyQuestions__icon"
                style={{ backgroundImage: `url(${getIcon(item.category)}` }}
              />
            )}
            indicator={item.length}
            onClick={() => {
              dispatch({
                type: 'UPDATE_USER_QUESTION_CATEGORY',
                payload: {
                  category: item.category,
                },
              });
              setActivePanel(globalVariables.commonView.panels.questionsList);
            }}
          >
            <div className="MyQuestions__category">
              {globalVariables.translateEnToRu(item.category)}
            </div>
          </SimpleCell>
        );
      });
    }
    return (
      <Placeholder
        icon={<Icon28MarketOutline width={38} height={43} />}
        action={(
          <Button mode="tertiary" onClick={() => setActiveStory('ShopRoot')}>
            Перейти в магазин
          </Button>
        )}
      >
        Приобретайте вопросы в магазине и зарабатывайте очки GP на чужих ошибках.
      </Placeholder>
    );
  }, [JSON.stringify(availableCategories), availableCategories.length]);

  return (
    <Group
      className="MyQuestions"
      separator="hide"
      header={(
        <Header className="MyQuestions__header">
          Ваши вопросы
        </Header>
      )}
      description={(
        <Caption level="1" weight="regular">
          {(availableCategories.length > 0 && `Всего ${availableCategories[0].length} ${getCorrectWord(availableCategories[0].length)}.`)}
        </Caption>
      )}
    >
      {categoriesMemo}
    </Group>
  );
};

MyQuestions.propTypes = {
  setActivePanel: PropTypes.func.isRequired,
  setActiveStory: PropTypes.func.isRequired,
};
MyQuestions.defaultProps = {};
export default MyQuestions;
