import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import './mindbreakers.css';
import {
  Button,
  Div,
  Group,
  Header,
  HorizontalScroll,
  Placeholder,
  Tabs,
  TabsItem,
} from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import Icon28MarketOutline from '@vkontakte/icons/dist/28/market_outline';
import RenderedQuestionCard from './RenderedQuestionCard';
import globalVariables from '../../../../../GlobalVariables';

const Mindbreakers = (props) => {
  const { setActivePanel, setSelectedQuestion, setActiveStory } = props;
  const scrollRef = useRef(null);

  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.userQuestions.category);
  const questionsCategory = useSelector((state) => state.userQuestions.selectedQuestionsCategory);
  const categoriesHorizontalScroll = useSelector((state) => state.userQuestions.categoriesHorizontalScroll);
  const availableCategories = useSelector((state) => Object.keys(state.userQuestions.questions)
    .filter((key) => state.userQuestions.questions[key].length > 0));

  const [activeTab, setActiveTab] = useState(selectedCategory);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_USER_QUESTION_CATEGORY',
      payload: {
        category: activeTab,
        categoriesHorizontalScroll: scrollRef.current.parentNode.scrollLeft,
      },
    });
  }, [activeTab]);

  useEffect(() => {
    scrollRef.current.parentNode.scrollLeft = categoriesHorizontalScroll;
  }, []);

  const questionsCategoryMemo = useMemo(() => {
    if (questionsCategory.length > 0) {
      return (
        <Div>
          <RenderedQuestionCard
            setActivePanel={setActivePanel}
            setSelectedQuestion={setSelectedQuestion}
            questions={questionsCategory}
          />
        </Div>
      );
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
  }, [JSON.stringify(questionsCategory), questionsCategory.length]);

  return (
    <Group
      className="Mindbreakers"
      header={(
        <Header
          indicator={questionsCategory.length > 0 && questionsCategory.length}
        >
          Мои вопросы
        </Header>
      )}
    >
      <HorizontalScroll>
        <Tabs mode="buttons" getRootRef={scrollRef}>
          {(availableCategories.map((category) => (
            <div
              className="Mindbreakers__horizontalScroll--buttonOuter"
              key={category}
            >
              <TabsItem
                onClick={() => setActiveTab(category)}
                selected={activeTab === category}
              >
                {globalVariables.translateEnToRu(category)}
              </TabsItem>
            </div>
          )))}
        </Tabs>
      </HorizontalScroll>
      {questionsCategoryMemo}
    </Group>
  );
};

Mindbreakers.propTypes = {
  setActivePanel: PropTypes.func.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
  setActiveStory: PropTypes.func.isRequired,

};
Mindbreakers.defaultProps = {};
export default Mindbreakers;
