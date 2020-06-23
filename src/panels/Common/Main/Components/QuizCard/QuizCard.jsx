import React from 'react';
import PropTypes from 'prop-types';
import Icon28BrainOutline from '@vkontakte/icons/dist/28/brain_outline';
import './quizCard.css';
import {
  Button, Card, Cell, Div, Subhead, Text, Tooltip,
} from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import globalVariables from '../../../../../GlobalVariables';

const QuizCard = (props) => {
  const { completed, nextView } = props;
  const dispatch = useDispatch();
  const tooltips = useSelector((state) => state.tooltip.story1);

  function onCloseTooltip() {
    dispatch({
      type: 'TOOLTIP_UPDATE_STORY1',
      payload: {
        quizBlock: false,
        taxEffect: true,
      },
    });
  }

  return (

    <Div style={{ paddingBottom: '10px', paddingTop: 0 }}>

      <Card size="l">
        <Tooltip
          text="Ежедневно в Мозгополии проводятся небольшие тесты для проверки уровня Ваших знаний."
          offsetX={50}
          cornerOffset={90}
          isShown={tooltips.quizBlock}
          onClose={onCloseTooltip}
          alignY="top"
        >
          <Div
            className="QuizCard"
          >
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
                description={(
                  <div className="QuizCard--description">
                    Дайте 5 правильных ответов, чтобы
                    не платить мозговой налог и заработать монеты.
                  </div>
                )}
                size="l"
                bottomContent={(
                  <Button
                    mode="primary"
                    onClick={() => {
                      if (!completed) {
                        nextView(globalVariables.view.work);
                      }
                    }}
                  >
                    Пройти сейчас
                  </Button>
                )}
              >
                <Subhead weight="regular">
                  Мозговой отчёт
                </Subhead>
              </Cell>
            ))}

          </Div>
        </Tooltip>

      </Card>


    </Div>

  );
};

QuizCard.propTypes = {
  completed: PropTypes.bool,
  nextView: PropTypes.func.isRequired,
};
QuizCard.defaultProps = {
  completed: false,
};
export default QuizCard;
