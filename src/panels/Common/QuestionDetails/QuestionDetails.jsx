import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './questionDetails.css';
import {
  Card,
  Div,
  Group,
  Header,
  InfoRow,
  IOS,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Separator,
  Tabs,
  TabsItem,
  Title,
  usePlatform,
} from '@vkontakte/vkui';
import AnswerButton from '../../CustomComponents/AnswerButton';
import globalVariables from '../../../GlobalVariables';

const QuestionDetails = (props) => {
  const { id, setActivePanel, selectedQuestion } = props;
  const platform = usePlatform();

  const [activeTab, setActiveTab] = useState('Today');

  useEffect(() => {
  }, [selectedQuestion]);

  return (
    <Panel id={id} className="QuestionDetails">
      <PanelHeader
        left={(
          <PanelHeaderBack
            label={(platform === IOS && 'Назад')}
            onClick={() => setActivePanel('Main')}
          />
        )}
      >
        Вопрос
      </PanelHeader>
      <Group>
        <Div>
          <Title level="1" weight="bold">
            {selectedQuestion.text}
          </Title>

          <div className="QuestionDetails__answersGroup">
            <AnswerButton
              className="QuestionDetails__answer"
              label={selectedQuestion.answers[0]}
              answerNumber={0}
              type="correct"
            />
            <AnswerButton
              className="QuestionDetails__answer"
              label={selectedQuestion.answers[1]}
              answerNumber={1}
              type=""
            />
            <AnswerButton
              className="QuestionDetails__answer"
              label={selectedQuestion.answers[2]}
              answerNumber={2}
              type=""
            />
            <AnswerButton
              className="QuestionDetails__answer"
              label={selectedQuestion.answers[3]}
              answerNumber={3}
              type=""
            />
          </div>


          <div className="QuestionDetails__generalInfo">
            <Header
              style={{ marginTop: '15px', padding: 0 }}
            >
              Общая информация
            </Header>

            <Card mode="outline">
              <Div>
                <InfoRow header="Категория вопроса">
                  {globalVariables.translateEnToRu(selectedQuestion.category)}
                </InfoRow>
                <Separator style={{ margin: '13px 0 11px 0' }} wide />
                <InfoRow header="GP за ошибку">
                  {selectedQuestion.bpForError}
                </InfoRow>
              </Div>
            </Card>
          </div>

          <div className="QuestionDetails__statistics">
            <Header
              style={{ marginTop: '15px', padding: 0 }}
            >
              Статистика
            </Header>
            <Tabs>
              <TabsItem
                selected={activeTab === 'Today'}
                onClick={() => setActiveTab('Today')}
              >
                Сегодня
              </TabsItem>
              <TabsItem
                selected={activeTab === 'Yesterday'}
                onClick={() => setActiveTab('Yesterday')}
              >
                Вчера
              </TabsItem>
              <TabsItem
                selected={activeTab === 'Overall'}
                onClick={() => setActiveTab('Overall')}
              >
                Все время
              </TabsItem>
            </Tabs>
            <Card mode="outline">
              <Div>
                <InfoRow header="Показов игрокам">
                  {(activeTab === 'Today') && (selectedQuestion.views.today)}
                  {(activeTab === 'Yesterday') && (selectedQuestion.views.yesterday)}
                  {(activeTab === 'Overall') && (selectedQuestion.views.overall)}
                </InfoRow>
                <Separator style={{ margin: '13px 0 11px 0' }} wide />
                <InfoRow header="Правильных ответов">
                  {(activeTab === 'Today') && (selectedQuestion.views.today - selectedQuestion.error_count.today)}
                  {(activeTab === 'Yesterday') && (selectedQuestion.views.yesterday - selectedQuestion.error_count.yesterday)}
                  {(activeTab === 'Overall') && (selectedQuestion.views.overall - selectedQuestion.error_count.overall)}
                </InfoRow>
                <Separator style={{ margin: '13px 0 11px 0' }} wide />
                <InfoRow header="Неправильных ответов">
                  {(activeTab === 'Today') && (selectedQuestion.error_count.today)}
                  {(activeTab === 'Yesterday') && (selectedQuestion.error_count.yesterday)}
                  {(activeTab === 'Overall') && (selectedQuestion.error_count.overall)}
                </InfoRow>
                <Separator style={{ margin: '13px 0 11px 0' }} wide />
                <InfoRow header="Получено GP">
                  {(activeTab === 'Today') && (selectedQuestion.bpEarned.today)}
                  {(activeTab === 'Yesterday') && (selectedQuestion.bpEarned.yesterday)}
                  {(activeTab === 'Overall') && (selectedQuestion.bpEarned.overall)}
                </InfoRow>
              </Div>
            </Card>
          </div>
        </Div>
      </Group>


    </Panel>
  );
};

QuestionDetails.propTypes = {
  id: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
  selectedQuestion: PropTypes.shape({
    text: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    bpForError: PropTypes.number,
    bpEarned: PropTypes.shape({
      overall: PropTypes.number,
      yesterday: PropTypes.number,
      today: PropTypes.number,
    }),
    views: PropTypes.shape({
      overall: PropTypes.number,
      yesterday: PropTypes.number,
      today: PropTypes.number,
    }),
    error_count: PropTypes.shape({
      overall: PropTypes.number,
      yesterday: PropTypes.number,
      today: PropTypes.number,
    }),
  }).isRequired,
};
QuestionDetails.defaultProps = {};
export default QuestionDetails;
