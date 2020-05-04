import React from 'react';
import PropTypes from 'prop-types';
import './quizResultExcellent.css';
import {
  Button, Placeholder, Text, Title,
} from '@vkontakte/vkui';
import cupIcon from '../../../../assets/Quiz/cup.png';

const QuizResultExcellent = (props) => {
  const { correctQuestionCount } = props;
  return (
    <Placeholder
      icon={(
        <div
          className="QuizResultExcellent--picture"
          style={{ backgroundImage: `url(${cupIcon})` }}
        />
      )}
      header={(
        <div className="QuizResultExcellent--header">
          <div className="QuizResult--awards">
            <div className="QuizResult--awards_item">
              <Title
                level={1}
                weight="semibold"
                className="QuizResult--GPcounter"
              >
                {`+${correctQuestionCount * 10}`}
              </Title>
              <Title
                level={1}
                mode="secondary"
                weight="semibold"
                className="QuizResult--counterName QuizResult--counterName_default"
              >
                монет
              </Title>
            </div>
            <div className="QuizResult--awards_item--divider" />
            <div className="QuizResult--awards_item">
              <Title
                level={1}

                weight="semibold"
                className="QuizResult--counterName_green"
              >
                {`+${correctQuestionCount}`}
              </Title>
              <Title
                level={1}
                mode="secondary"
                weight="semibold"
                className="QuizResult--counterName QuizResult--counterName_default"
              >
                BR
              </Title>
            </div>
          </div>


          <div className="QuizResultExcellent--subheader">
            Вы не допустили ни одной ошибки.
            <br />
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
  correctQuestionCount: PropTypes.number.isRequired,
};
QuizResultExcellent.defaultProps = {};
export default QuizResultExcellent;
