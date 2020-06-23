import React from 'react';
import PropTypes from 'prop-types';
import './effectsRow.css';
import {
  Caption,
  Group, Header, HorizontalScroll, Tooltip,
} from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import Effect from './Components/Effect';

const EffectsRow = (props) => {
  const { effects, popoutMainView } = props;
  const dispatch = useDispatch();
  const tooltipsStory1 = useSelector((state) => state.tooltip.story1);
  const tooltipsStory2 = useSelector((state) => state.tooltip.story2);

  function onCloseTooltipBalance() {
    dispatch({
      type: 'TOOLTIP_UPDATE_STORY1',
      payload: {
        taxEffect: false,
      },
    });
  }

  function onCloseTooltipEffect() {
    dispatch({
      type: 'TOOLTIP_UPDATE_STORY2',
      payload: {
        GPeffect: false,
        GPeffectCompleted: true,
        notifications: true,
      },
    });
  }

  return (
    <Group
      className="EffectsRow"
      separator="hide"
      header={(
        <Header className="EffectsRow__header">
          Статистика
        </Header>
      )}
      description={(
        <Caption level="1" weight="regular">
          Нажмите на карточку, чтобы посмотреть её описание. Проведите справа налево, чтобы увидеть все карточки.
        </Caption>
      )}
    >

      <HorizontalScroll>
        <div className="EffectsRow__scroll">
          {(
          effects.map((effect) => {
            if (effect.name === 'GPtoday') {
              return (
                <Tooltip
                  key={`BalanceItem__${effect.name}`}
                  text="Это эффект профиля. Нажмите на него, чтобы открыть."
                  isShown={tooltipsStory2.GPeffect && !tooltipsStory2.GPeffectCompleted && effect.name === 'GPtoday' && !popoutMainView}
                  onClose={onCloseTooltipEffect}
                  offsetX={12}
                >
                  <div
                    className="EffectsRow__item"
                    key={`Effect__${effect.name}`}
                  >
                    {/* <ScalableButton borderRadius={'Card'}> */}
                    <Effect
                      count={effect.count}
                      currency={effect.currency}
                      icon={effect.icon}
                      description={effect.description}
                      name={effect.name}
                    />

                    {/* </ScalableButton> */}
                  </div>
                </Tooltip>
              );
            } if (effect.name === 'Tax') {
              return (
                <Tooltip
                  key={`BalanceItem__${effect.name}`}
                  text="Если Вы пропустите ежедневный тест, правительство спишет с Вашего монетного счёта налог."
                  isShown={tooltipsStory1.taxEffect && effect.name === 'Tax' && !popoutMainView}
                  onClose={() => onCloseTooltipBalance()}
                  offsetX={12}
                >
                  <div
                    className="EffectsRow__item"
                    key={`Effect__${effect.name}`}
                  >
                    {/* <ScalableButton borderRadius={'Card'}> */}
                    <Effect
                      count={effect.count}
                      currency={effect.currency}
                      icon={effect.icon}
                      description={effect.description}
                      name={effect.name}
                    />

                    {/* </ScalableButton> */}
                  </div>
                </Tooltip>
              );
            }
            return (
              <div
                className="EffectsRow__item"
                key={`Effect__${effect.name}`}
              >
                {/* <ScalableButton borderRadius={'Card'}> */}
                <Effect
                  count={effect.count}
                  currency={effect.currency}
                  icon={effect.icon}
                  description={effect.description}
                  name={effect.name}
                />

                {/* </ScalableButton> */}
              </div>
            );
          })
        )}
        </div>
      </HorizontalScroll>
    </Group>

  );
};

EffectsRow.propTypes = {
  effects: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    currency: PropTypes.string,
    icon: PropTypes.any,
    description: PropTypes.string,
  })).isRequired,
  popoutMainView: PropTypes.bool.isRequired,
};
EffectsRow.defaultProps = {};
export default EffectsRow;
