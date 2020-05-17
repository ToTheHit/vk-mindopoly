import React, { useEffect, useState } from 'react';
import './effectGPDetails.css';
import {
  Cell, Div, Header, Separator, SimpleCell, withModalRootContext,
} from '@vkontakte/vkui';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon48Brain from '../../../../assets/Icons/icn48_brain.png';
import Icon64Math from '../../../../assets/Icons/icn64_math.png';
import Icon64Russian from '../../../../assets/Icons/icn64_rus.png';
import Icon64Litra from '../../../../assets/Icons/icn64_litra.png';
import Icon64Physics from '../../../../assets/Icons/icn64_physics.png';
import Icon64Chemistry from '../../../../assets/Icons/icn64_chem.png';
import Icon64Astro from '../../../../assets/Icons/icn64_astro.png';
import Icon64Biology from '../../../../assets/Icons/icn64_bio.png';
import Icon64History from '../../../../assets/Icons/icn64_history.png';
import Icon64Art from '../../../../assets/Icons/icn64_art.png';
import Icon64Sport from '../../../../assets/Icons/icn64_sport.png';
import Icon64Other from '../../../../assets/Icons/icn64_other.png';
import Icon64Geography from '../../../../assets/Icons/icn64_geography.png';
import globalVariables from '../../../../GlobalVariables';

const EffectGPDetailsContent = (props) => {
  const { updateModalHeight } = props;

  const questions = useSelector((state) => state.userQuestions.questions.All);
  const GPToday = useSelector((state) => state.userInfo.GP.today);
  const quizIncome = useSelector((state) => state.userInfo.lastExamReward.bp);
  const isExamAvailable = useSelector((state) => state.userInfo.isExamAvailable);
  const [categoryIncome, setCategoryIncome] = useState([]);
  // const [quizIncome, setQuizIncome] = useState(0);
  const [questionsIncome, setQuestionIncome] = useState(0);

  function getIcon(category) {
    switch (category) {
      case 'Math':
        return Icon64Math;
      case 'Russian':
        return Icon64Russian;
      case 'Literature':
        return Icon64Litra;
      case 'Physics':
        return Icon64Physics;
      case 'Chemistry':
        return Icon64Chemistry;
      case 'Astronomy':
        return Icon64Astro;
      case 'Biology':
        return Icon64Biology;
      case 'History':
        return Icon64History;
      case 'Art':
        return Icon64Art;
      case 'Sport':
        return Icon64Sport;
      case 'Other':
        return Icon64Other;
      case 'Geography':
        return Icon64Geography;
      default:
        return '';
    }
  }

  useEffect(() => {
    const sortedQuestions = {};
    for (let i = 0; i < questions.length; i += 1) {
      if (!sortedQuestions[questions[i].category]) {
        sortedQuestions[questions[i].category] = 0;
      }
      sortedQuestions[questions[i].category] += questions[i].bpEarned.today;
    }

    Object.keys(sortedQuestions).map((item) => {
      if (sortedQuestions[item] === 0) delete sortedQuestions[item];
    });

    let tempQuestionsIncome = 0;
    Object.keys(sortedQuestions).map((item) => {
      tempQuestionsIncome += sortedQuestions[item];
    });
    setQuestionIncome(tempQuestionsIncome);

    const rendered = Object.keys(sortedQuestions).map((item) => (
      <SimpleCell
        key={`EffectGPDetails__category-${item}`}
        disabled
        className="EffectGPDetails--itemIncome"
        before={(
          <div
            className="EffectGPDetails--icon"
            style={{ backgroundImage: `url(${getIcon(item)})` }}
          />
        )}
        indicator={`+${sortedQuestions[item]} GP`}
      >
        {globalVariables.translateEnToRu(item)}
      </SimpleCell>
    ));
    setCategoryIncome(rendered);
  }, [questions]);

  useEffect(() => {
    if (categoryIncome.length || quizIncome > 0) {
      updateModalHeight();
    }
  }, [categoryIncome, quizIncome]);

  return (
    <div className="EffectGPDetails__questionsIncome">
      <Cell
        multiline
        description={(GPToday !== 0
          ? `Сегодня Вы заработали ${GPToday} GP. Из них ${questionsIncome} GP принесли Ваши вопросы. Приобретайте больше вопросов в магазине, чтобы получать больше GP.`
          : 'Пока что у Вас нет прироста очков гения. Приобретайте больше вопросов в магазине, чтобы получать больше GP.')}
      />
      <Div style={{ paddingTop: '7px' }}>
        {(((quizIncome > 0) && !isExamAvailable) && (
          <SimpleCell
            disabled
            before={(
              <div
                className="EffectGPDetails--icon"
                style={{ backgroundImage: `url(${Icon48Brain})` }}
              />
            )}
            indicator={`+${quizIncome} GP`}
          >
            Мозговой отчёт
          </SimpleCell>
        ))}

        {((quizIncome > 0 && (categoryIncome.length > 0)) && (
          <Separator style={{ marginTop: '16px' }} wide />
        ))}

        {(categoryIncome.length > 0 ? (
          <div>
            <Header
              style={{ padding: 0 }}
            >
              Прибыль с вопросов
            </Header>

            {categoryIncome}
          </div>
        ) : null)}

      </Div>
    </div>
  );
};

EffectGPDetailsContent.propTypes = {
  updateModalHeight: PropTypes.func,
  status: PropTypes.shape({
    isActive: PropTypes.bool,
    setIsActive: PropTypes.func,
  }).isRequired,
};
EffectGPDetailsContent.defaultProps = {
  updateModalHeight: () => {
  },
};
export default withModalRootContext(EffectGPDetailsContent);
