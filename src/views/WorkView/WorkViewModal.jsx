import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './workViewModal.css';
import { ModalCard, ModalRoot } from '@vkontakte/vkui';
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import { useDispatch, useSelector } from 'react-redux';
import globalVariables from '../../GlobalVariables';

const WorkViewModal = (props) => {
  const { nextView, setPopoutIsActive } = props;
  const modalIsActive = useSelector((state) => state.workViewModal.modalIsActive);
  const questionsLength = useSelector((state) => state.workViewModal.questionsLength);
  const dispatch = useDispatch();

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
        header={`${questionsLength} вопросов из разных тем. 20 секунд на один вопрос.\nВы готовы?`}

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
            title: 'Начать',
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
};
WorkViewModal.defaultProps = {};
export default WorkViewModal;
