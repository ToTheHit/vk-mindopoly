import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './quizBlock.css';
import { Avatar, Div, Group, Headline, Text, Title, } from '@vkontakte/vkui';
import AnswerButton from '../../CustomComponents/AnswerButton/AnswerButton';

const QuizBlock = (props) => {
  const {
    data, time, onComplete,
  } = props;
  const refButton1 = useRef(null);
  const refButton2 = useRef(null);
  const refButton3 = useRef(null);
  const refButton4 = useRef(null);
  const [stop, setStop] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [correctButton, setcorrectButton] = useState();

  useEffect(() => {
    switch (data.correctAnswerNumber) {
      case 0:
        setcorrectButton(refButton1);
        break;
      case 1:
        setcorrectButton(refButton2);
        break;
      case 2:
        setcorrectButton(refButton3);
        break;
      case 3:
        setcorrectButton(refButton4);
        break;
      default:
        break;
    }
    return () => {
      setSelectedButton(null);
      setcorrectButton(null);
      setStop(false);
    };
  }, [data.question]);

  useEffect(() => {
    if (time <= 0) {
      if (!selectedButton) {
        const rndNumber = Math.floor(Math.random() * Math.floor(3));
        const arr = [refButton1, refButton2, refButton3, refButton4];
        arr.splice(arr.indexOf(correctButton), 1);
        setSelectedButton(arr[rndNumber]);
      }
      onComplete(data._id, data.question, 'Нет ответа', data.answers[data.correctAnswerNumber], -1, data.correctAnswerNumber);
    }
  }, [time]);

  function getType(ref) {
    if (time > 0 && !stop) {
      return '';
    }
    if (selectedButton === ref) {
      if (selectedButton === correctButton) return 'correct';
      return 'wrong';
    }
    if (ref === correctButton) return 'correct';
    return 'disabled';
  }

  return (
    <div style={{ paddingTop: 0 }}>
      <Div style={{ paddingBottom: 0 }}>
        <Title level={1} weight="bold" className="Work--title">
          {data.question}
        </Title>
      </Div>
      <Group
        className={'Work--question'}
        description={(data.requestedBy !== 0) && (
          <div className="Work--question__author">
            <Avatar size={24} src={data.requestedBy.photo} />
            <div className="Work--question__author-name">
              {`${data.requestedBy.first_name} ${data.requestedBy.last_name} - автор вопроса`}
            </div>
          </div>
        )}
      >
        <Div style={{ paddingTop: '2px' }}>
          <AnswerButton
            className="Work--button"
            ref={refButton1}
            label={data.answers[0]}
            answerNumber={0}
            action={() => {
              if (time > 0 && !stop) {
                setStop(true);
                setSelectedButton(refButton1);
                onComplete(data._id, data.question, data.answers[refButton1.current.getAttribute('answernumber')], data.answers[data.correctAnswerNumber], parseInt(refButton1.current.getAttribute('answernumber'), 10), data.correctAnswerNumber);
              }
            }}
            type={getType(refButton1)}
          />
          <AnswerButton
            className="Work--button"
            ref={refButton2}
            label={data.answers[1]}
            answerNumber={1}
            action={() => {
              if (time > 0 && !stop) {
                setStop(true);
                setSelectedButton(refButton2);
                onComplete(data._id, data.question, data.answers[refButton2.current.getAttribute('answernumber')], data.answers[data.correctAnswerNumber], parseInt(refButton2.current.getAttribute('answernumber'), 10), data.correctAnswerNumber);
              }
            }}
            type={getType(refButton2)}
          />
          <AnswerButton
            className="Work--button"
            ref={refButton3}
            label={data.answers[2]}
            answerNumber={2}
            action={() => {
              if (time > 0 && !stop) {
                setStop(true);
                setSelectedButton(refButton3);
                onComplete(data._id, data.question, data.answers[refButton3.current.getAttribute('answernumber')], data.answers[data.correctAnswerNumber], parseInt(refButton3.current.getAttribute('answernumber'), 10), data.correctAnswerNumber);
              }
            }}
            type={getType(refButton3)}
          />
          <AnswerButton
            className="Work--button"
            ref={refButton4}
            label={data.answers[3]}
            answerNumber={3}
            action={() => {
              if (time > 0 && !stop) {
                setStop(true);
                setSelectedButton(refButton4);
                onComplete(data._id, data.question, data.answers[refButton4.current.getAttribute('answernumber')], data.answers[data.correctAnswerNumber], parseInt(refButton4.current.getAttribute('answernumber'), 10), data.correctAnswerNumber);
              }
            }}
            type={getType(refButton4)}
          />
        </Div>
      </Group>

      {(selectedButton && data.explanation) && (
        <Group>
          <Div style={{ marginTop: 0 }}>
            <Headline
              level={2}
              weight="semibold"
              style={{ marginBottom: '7px' }}
            >
              Пояснение
            </Headline>
            <Text>
              {data.explanation}
            </Text>
          </Div>
        </Group>
      )}
    </div>
  );
};

QuizBlock.propTypes = {
  data: PropTypes.shape({
    question: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.string),
    correctAnswer: PropTypes.string,
    correctAnswerNumber: PropTypes.number,
    explanation: PropTypes.string,
    requestedBy: PropTypes.oneOfType([PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      photo: PropTypes.string,
    }), PropTypes.number]),
    _id: PropTypes.string,
  }).isRequired,
  time: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};
QuizBlock.defaultProps = {};
export default QuizBlock;
