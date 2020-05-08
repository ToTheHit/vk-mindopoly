import React from 'react';
import PropTypes from 'prop-types';
import Icon28BrainOutline from '@vkontakte/icons/dist/28/brain_outline';
import './quizCard.css';
import {
  Button, Card, Cell, Div, Subhead, Text,
} from '@vkontakte/vkui';
import Icon32Coins from "../../../../assets/Quiz/icn32_coins.png";

const QuizCard = (props) => {
  const { completed, date, setActivePanel } = props;
  return (
    <Div style={{ paddingBottom: '10px', paddingTop: 0 }}>
      <Card size="l">
        <Div
          className="QuizCard"
        >
          {/*<div className="QuizCard__icon" style={{ backgroundImage: `url(${Icon28BrainOutline})` }} />*/}
          <Icon28BrainOutline className="QuizCard__icon" width={21} height={21} />
          {(completed && (
            <Cell
              multiline
              description="Вы уже прошли мозговой отчёт. Новый появится уже завтра!"
            >
              <Text>
                Мозговой отчёт (завершено)
              </Text>
            </Cell>
          ))}

          {(!completed && (
            <Cell
              multiline
              description={<div className="QuizCard--description">Дайте 4 правильных ответа, чтобы не платить мозговой налог и заработать марки.</div>}
              size="l"
              bottomContent={(
                <Button
                  mode="primary"
                  onClick={() => {
                    if (!completed) setActivePanel('WorkPanel');
                  }}
                >
                  Пройти сейчас
                </Button>
              )}
            >
              <Subhead weight="regular">
                {`Мозговой отчёт, ${date}`}
              </Subhead>
            </Cell>
          ))}

        </Div>
      </Card>
    </Div>
  );
};

QuizCard.propTypes = {
  completed: PropTypes.bool,
  setActivePanel: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
};
QuizCard.defaultProps = {
  completed: false
};
export default QuizCard;