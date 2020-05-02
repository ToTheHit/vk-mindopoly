import React from 'react';
import PropTypes from 'prop-types';
import './quizResultExcellent.css';
import {
  Button, Header, Placeholder, Text,
} from '@vkontakte/vkui';
import cupIcon from '../../../../assets/Quiz/cup.png';

const QuizResultExcellent = (props) => {
  const { rightQuestionCount } = props;
  return (
    <Placeholder
      icon={<div className="QuizResultExcellent--picture" style={{ backgroundImage: `url(${cupIcon})` }} />}
      header={(
        <div className="QuizResultExcellent--header">
          <div>
            <Header
              level={2}
              weight="semibold"
              className="QuizResult--GPcounter"
            >
              + {rightQuestionCount * 10}
            </Header>
            <Header mode="secondary" weight="semibold" className="QuizResult--GPcounter">GP</Header>
          </div>

          <div className="QuizResultExcellent--subheader">
            Вы не допустили ни одной ошибки.
            {' '}
            <br />
            {' '}
            Поздравляем!
          </div>
        </div>
      )}
      action={(
        <div className="QuizResultExcellent--action">
          <Button size="l">Рассказать друзьям</Button>
          <Text className="QuizResultExcellent--text">Чтобы получить еще +50 GP.</Text>
        </div>
      )}
    />
  );
};

QuizResultExcellent.propTypes = {
  rightQuestionCount: PropTypes.number.isRequired,
};
QuizResultExcellent.defaultProps = {};
export default QuizResultExcellent;
