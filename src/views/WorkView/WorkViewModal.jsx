import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './workViewModal.css';
import { ModalCard, ModalRoot } from '@vkontakte/vkui';
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import { useDispatch, useSelector } from 'react-redux';
import globalVariables from '../../GlobalVariables';

const WorkViewModal = (props) => {
  const { nextView, setPopoutIsActive, isPreviousQuiz } = props;
  const modalIsActive = useSelector((state) => state.workViewModal.modalIsActive);
  const questionsLength = useSelector((state) => state.workViewModal.questionsLength);
  const answersLength = useSelector((state) => state.quiz.quizResult.length);
  const dispatch = useDispatch();

  const [modalText, setModalText] = useState('');

  useEffect(() => {
    setTimeout(() => {
      console.info('answersLength', answersLength);
    }, 1000);

    if (answersLength === 0) {
      setModalText(`${questionsLength} вопросов из разных тем. 20 секунд на один вопрос.\nВы готовы?`);
    } else {
      setModalText(`Вы ответили на ${answersLength} из ${questionsLength - 1} вопросов.\n Чтобы начать новый отчёт, необходимо закончить текущий.\nПродолжить?`);
    }
  }, [answersLength, questionsLength]);

  function closeModal() {
    dispatch({
      type: 'UPDATE_WORK-VIEW-MODAL',
      payload: {
        modalIsActive: false,
      },
    });
  }

  useEffect(() => {
    if (questionsLength > 0) setPopoutIsActive(false);
  }, [questionsLength]);

  return (
    <ModalRoot
      activeModal={(modalIsActive && questionsLength > 0) ? 'Work--readyCheck' : null}
      onClose={() => closeModal()}
    >
      <ModalCard
        id="Work--readyCheck"
        icon={<Icon56ErrorOutline style={{ transform: 'rotate(180deg)' }} />}
        header={modalText}

        actions={[
          {
            title: 'Отложить',
            mode: 'secondary',
            action: () => {
              closeModal();
              nextView(globalVariables.view.main);
            },
          },
          {
            // title: 'Начать',
            title: (answersLength === 0 ? 'Начать' : 'Продолжить'),
            mode: 'primary',
            action: () => closeModal(),
          },
        ]}
        onClose={() => closeModal()}
      />
    </ModalRoot>
  );
};

WorkViewModal.propTypes = {
  nextView: PropTypes.func.isRequired,
  setPopoutIsActive: PropTypes.func.isRequired,
  isPreviousQuiz: PropTypes.bool.isRequired,
};
WorkViewModal.defaultProps = {};
export default WorkViewModal;
