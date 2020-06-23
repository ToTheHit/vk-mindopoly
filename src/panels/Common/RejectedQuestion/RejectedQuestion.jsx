import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './rejectedQuestion.css';
import {
  Card, Div,
  Group,
  Title,
  IOS,
  Panel,
  Subhead,
  PanelHeader,
  PanelHeaderBack,
  usePlatform, Text, classNames, Button,
} from '@vkontakte/vkui';
import { useSelector } from 'react-redux';
import Icon24MarketOutline from '@vkontakte/icons/dist/24/market_outline';
import globalVariables from '../../../GlobalVariables';

const RejectedQuestion = (props) => {
  const { setActivePanel, id, selectedQuestion, setActiveStory } = props;
  const platform = usePlatform();
  const scheme = useSelector((state) => state.schemeChanger.scheme);

  function getReasonDescription() {
    if (selectedQuestion.reason) return selectedQuestion.reason;
    return globalVariables.getReasonDescriptionByCode(selectedQuestion.code);
  }

  const controlHardwareBackButton = useCallback(() => {
    setActivePanel(globalVariables.commonView.panels.main);
  }, []);

  useEffect(() => {
    // Алгоритм для обработки аппаратной кнопки "Назад" на андроидах
    if (window.history.state) {
      window.history.replaceState({ page: 'RejectedQuestion' }, 'RejectedQuestion', `${window.location.search}`);
    } else {
      window.history.pushState({ page: 'RejectedQuestion' }, 'RejectedQuestion', `${window.location.search}`);
    }
    window.addEventListener('popstate', controlHardwareBackButton);
    return () => {
      window.removeEventListener('popstate', controlHardwareBackButton);
    };
  }, []);

  return (
    <Panel id={id} className="RejectedQuestion">
      <PanelHeader
        left={(
          <PanelHeaderBack
            label={(platform === IOS && 'Назад')}
            onClick={() => {
              setActivePanel(globalVariables.commonView.panels.main);
            }}
          />
        )}
      >
        Вопрос
      </PanelHeader>

      <Div>
        <Group
          separator="hide"
          header={(
            <Title level="1" weight="bold" className="RejectedQuestion__header">
              {selectedQuestion.text}
            </Title>
          )}
        >
          <Card className={classNames('RejectedQuestion__card', { 'RejectedQuestion__card-dark': scheme === 'space_gray' })}>
            <Div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
              <Subhead
                className="RejectedQuestion__subhead"
                weight="regular"
              >
                Вопрос отклонён модератором
              </Subhead>
              <Text
                className="RejectedQuestion__reason"
                weight="regular"
              >
                {`Причина: ${globalVariables.getReasonByCode(selectedQuestion.code)}`}
              </Text>
              <Subhead
                className={classNames('RejectedQuestion__description', { 'RejectedQuestion__description-dark': scheme === 'space_gray' })}
                weight="regular"
              >
                {getReasonDescription()}
              </Subhead>
            </Div>

          </Card>
        </Group>
        <Button
          className={classNames('RejectedQuestion__button', { 'RejectedQuestion__button-dark': scheme === 'space_gray' })}
          mode="secondary"
          size="xl"
          stretched
          before={(<Icon24MarketOutline width={24} height={24} />)}
          onClick={() => setActiveStory(globalVariables.commonView.roots.shop)}
        >
          Купить другой вопрос
        </Button>
      </Div>

    </Panel>
  );
};

RejectedQuestion.propTypes = {
  setActivePanel: PropTypes.func.isRequired,
  setActiveStory: PropTypes.func.isRequired,
  selectedQuestion: PropTypes.shape({
    text: PropTypes.string,
    code: PropTypes.number,
    reason: PropTypes.string,
  }).isRequired,
  id: PropTypes.string.isRequired,
};
RejectedQuestion.defaultProps = {};
export default RejectedQuestion;
