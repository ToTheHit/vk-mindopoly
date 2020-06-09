import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './workViewModal.css';
import { ModalCard, ModalRoot } from '@vkontakte/vkui';
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import { useDispatch, useSelector } from 'react-redux';
import globalVariables from '../../GlobalVariables';

const WorkViewModal = (props) => {
  const { nextView } = props;
  const modalIsActive = useSelector((state) => state.workViewModal.modalIsActive);
  const questionsLength = useSelector((state) => state.workViewModal.questionsLength);
  const answersLength = useSelector((state) => state.quiz.quizResult.length);
  const dispatch = useDispatch();
  const [buttonTitle, setButtonTitle] = useState('Продолжить');
  const [modalText, setModalText] = useState('');

  const controlHardwareBackButton = useCallback(() => {
    nextView(globalVariables.view.main);
    // window.history.back();
  }, []);

  useEffect(() => {
    // document.body.style.overflow = 'hidden';

/*    if (modalIsActive) {
      document.body.style.overflow = 'hidden';
    } else document.body.style.overflow = 'auto';*/
  }, [modalIsActive]);

  useEffect(() => {
    if (answersLength > 0) {
      setButtonTitle('Готов');
    } else setButtonTitle('Начать');
  }, [answersLength]);

  useEffect(() => {
    if (answersLength === 0) {
      setModalText(`${questionsLength} вопросов из разных тем. 20 секунд на один вопрос.\n Вы готовы?`);
    } else {
      setModalText(`Вы ответили на ${answersLength} из ${questionsLength - 1} вопросов.\n Вы готовы продолжить?`);
    }
  }, [answersLength, questionsLength]);

  function closeModal(isStart) {
    dispatch({
      type: 'UPDATE_WORK-VIEW-MODAL',
      payload: {
        modalIsActive: false,
        start: isStart,
      },
    });
  }

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
              closeModal(false);
              nextView(globalVariables.view.main);
            },
          },
          {
            title: buttonTitle,
            mode: 'primary',
            action: () => closeModal(true),
          },
        ]}
        onClose={() => closeModal(true)}
      />
    </ModalRoot>
  );
};

WorkViewModal.propTypes = {
  nextView: PropTypes.func.isRequired,
};
WorkViewModal.defaultProps = {};
export default WorkViewModal;
