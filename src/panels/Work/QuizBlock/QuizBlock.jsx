import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './quizBlock.css';
import {
  Button, Div, Group, Headline, Text, Title,
} from '@vkontakte/vkui';

const QuizBlock = (props) => {
  const { data, time, onComplete } = props;
  const refButton1 = useRef(null);
  const refButton2 = useRef(null);
  const refButton3 = useRef(null);
  const refButton4 = useRef(null);
  const [stop, setStop] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [rightButton, setRightButton] = useState();

  useEffect(() => {
    switch (data.answers.indexOf(data.rightAnswer)) {
      case 0:
        setRightButton(refButton1);
        break;
      case 1:
        setRightButton(refButton2);
        break;
      case 2:
        setRightButton(refButton3);
        break;
      case 3:
        setRightButton(refButton4);
        break;
      default:
        break;
    }
    return () => {
      setSelectedButton(null);
      setRightButton(null);
      setStop(false);
    };
  }, [data.question]);

  useEffect(() => {
    if (time <= 0) {
      if (!selectedButton) {
        const rndNumber = Math.floor(Math.random() * Math.floor(3));
        const arr = [refButton1, refButton2, refButton3, refButton4];
        arr.splice(arr.indexOf(rightButton), 1);
        setSelectedButton(arr[rndNumber]);
      }
      onComplete(data.question, (selectedButton ? selectedButton.current.textContent : 'Нет ответа'), rightButton.current.textContent);
    }
  }, [time]);

  function getMode(ref) {
    if (time > 0 && !stop) {
      if (selectedButton === ref) return 'primary';
      return 'secondary';
    }
    if (selectedButton === ref) {
      if (selectedButton === rightButton) return 'commerce';
      return 'destructive';
    }
    if (ref === rightButton) return 'commerce';
    return 'secondary';
  }

  return (
    <div style={{ paddingTop: 0 }}>
      <Div>
        <Title level={1} weight="bold" className="Work--title">
          {data.question}
        </Title>
      </Div>
      <Group>
        <Div>
          <Button
            mode={getMode(refButton1)}
            size="xl"
            className="Work--button"
            getRootRef={refButton1}
            onClick={(e) => {
              if (time > 0) {
                setStop(true);
                setSelectedButton(refButton1);
                onComplete(data.question, e.target.innerText, rightButton.current.textContent);
              }
            }}
          >
            {data.answers[0]}
          </Button>
          <Button
            mode={getMode(refButton2)}
            size="xl"
            className="Work--button"
            getRootRef={refButton2}
            onClick={(e) => {
              if (time > 0) {
                setStop(true);
                setSelectedButton(refButton2);
                onComplete(data.question, e.target.innerText, rightButton.current.textContent);
              }
            }}

          >
            {data.answers[1]}
          </Button>
          <Button
            mode={getMode(refButton3)}
            size="xl"
            className="Work--button"
            getRootRef={refButton3}
            onClick={(e) => {
              if (time > 0) {
                setStop(true);
                setSelectedButton(refButton3);
                onComplete(data.question, e.target.innerText, rightButton.current.textContent);
              }
            }}
          >
            {data.answers[2]}
          </Button>
          <Button
            mode={getMode(refButton4)}
            size="xl"
            className="Work--button"
            getRootRef={refButton4}
            onClick={(e) => {
              if (time > 0) {
                setStop(true);
                setSelectedButton(refButton4);
                onComplete(data.question, e.target.innerText, rightButton.current.textContent);
              }
            }}
          >
            {data.answers[3]}
          </Button>
        </Div>
      </Group>

      {selectedButton && (
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
    rightAnswer: PropTypes.string,
    explanation: PropTypes.string,
  }).isRequired,
  time: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};
QuizBlock.defaultProps = {};
export default QuizBlock;
