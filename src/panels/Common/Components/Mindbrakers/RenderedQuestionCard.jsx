import React from 'react';
import PropTypes from 'prop-types';
import { Card, classNames, Div, Subhead, Text, } from '@vkontakte/vkui';
import { useSelector } from 'react-redux';
import globalVariables from '../../../../GlobalVariables';
import './renderedQuestionCard.css';
import ScalableButton from '../../../CustomComponents/ScalableButton/ScalableButton';

const RenderedQuestionCard = (props) => {
  const { questions, setSelectedQuestion, setActivePanel } = props;
  const scheme = useSelector((state) => state.schemeChanger.scheme);

  return (
    questions.map((item) => (
      <ScalableButton
        key={`RenderedQuestionCard--card_${item._id}`}
        className="RenderedQuestionCard--card"
        borderRadius="Card"
      >
        <Card
          mode={scheme === 'space_gray' ? 'tint' : 'outline'}
          className={classNames('RenderedQuestionCard--card', { 'RenderedQuestionCard--card-dark': scheme === 'space_gray' })}
          onClick={() => {
            setSelectedQuestion(item);
            setActivePanel('QuestionDetails');
          }}
        >
          <Div>
            <div
              className={
                classNames('RenderedQuestionCard--card__header')
              }
              style={{ color: globalVariables.categoryColor(item.category) }}
            >
              <div
                className="RenderedQuestionCard--card__header-dot"
                style={{ backgroundColor: globalVariables.categoryColor(item.category) }}
              />
              {globalVariables.translateEnToRu(item.category)}
            </div>
            <Text className="RenderedQuestionCard--card__text">
              {item.text}
            </Text>

            {(!item.approved && (
              <div className="RenderedQuestionCard--card__footer">
                <Subhead weight="medium" className="RenderedQuestionCard--card__footer-item">
                  Вопрос на проверке
                </Subhead>
              </div>
            ))}

          </Div>
        </Card>
      </ScalableButton>

    ))
  );
};

RenderedQuestionCard.propTypes = {
  setActivePanel: PropTypes.func.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.string),
    approved: PropTypes.bool,
    bpEarned: PropTypes.shape({
      overall: PropTypes.number,
      today: PropTypes.number,
      yesterday: PropTypes.number,
    }),
    bpForError: PropTypes.number,
    category: PropTypes.string,
    error_count: PropTypes.shape({
      overall: PropTypes.number,
      today: PropTypes.number,
      yesterday: PropTypes.number,
    }),
    requestedBy: PropTypes.any,
    views: PropTypes.shape({
      overall: PropTypes.number,
      today: PropTypes.number,
      yesterday: PropTypes.number,
    }),
    text: PropTypes.string,
  })).isRequired,
};
RenderedQuestionCard.defaultProps = {};
export default RenderedQuestionCard;
