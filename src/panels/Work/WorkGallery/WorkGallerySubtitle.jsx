import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Cell, Div, Text, Title,
} from '@vkontakte/vkui';
import Icon28ArrowRightOutline from '@vkontakte/icons/dist/28/arrow_right_outline';
import ProgressRing from '../../CustomComponents/ProgressRing/ProgressRing';

const WorkGallerySubtitle = (props) => {
  const {
    questionIndex, category, goToNextQuestion, showArrowNext, time, totalQuestions, timeProgress,
  } = props;
  const [isUsed, setIsUsed] = useState(false);
  return (
    <Div className="Work--subTitle">
      {(questionIndex === 0 ? (
        <Cell
          multiline
          description="Не учитывается"
        >
          <Text>
            Вопрос для разогрева
          </Text>
        </Cell>
      ) : (
        <Cell
          multiline
          description={category}
        >
          <Text>
            {`Вопрос ${questionIndex} из ${totalQuestions - 1}`}
          </Text>
          {/*            <Text>
              {`Storage last ID: ${lastQuestionInStorage.id}`}
            </Text>
            <Text>
              {`This quiz ID: ${data._id}`}
            </Text> */}
        </Cell>
      ))}

      {showArrowNext ? (
        <div className="Work--arrowNext">
          <Button
            mode="secondary"
            onClick={() => {
              if (!isUsed) {
                setIsUsed(true);
                goToNextQuestion();
              }
            }}
          >
            <Icon28ArrowRightOutline />
          </Button>
        </div>
      ) : (
        <div className="Work--timer">
          <div className="Work--timer__gradient" />
          <ProgressRing
            className="Work--timer__circle"
            radius={34}
            stroke={5}
            initialStrokeDashoffest={151}
            progress={-1 * timeProgress}
            transitionDuration={500}
          />
          <div className="Work--timer__gradient-mask" />
          <div className="Work--timer__time">
            <Title level={2} weight="semibold">{(time > 0 ? time.toFixed(0) : 0)}</Title>
          </div>
        </div>
      )}
    </Div>
  );
};

WorkGallerySubtitle.propTypes = {
  time: PropTypes.number.isRequired,
  showArrowNext: PropTypes.bool.isRequired,
  questionIndex: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  goToNextQuestion: PropTypes.func.isRequired,
  timeProgress: PropTypes.number.isRequired,
};
WorkGallerySubtitle.defaultProps = {};
export default WorkGallerySubtitle;
