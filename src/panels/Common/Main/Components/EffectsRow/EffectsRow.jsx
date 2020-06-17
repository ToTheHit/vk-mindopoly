import React from 'react';
import PropTypes from 'prop-types';
import './effectsRow.css';
import {
  Caption,
  Group, Header, HorizontalScroll, Tooltip,
} from '@vkontakte/vkui';
import BalanceItem from '../Balance/BalanceItem';
import Effect from "./Components/Effect";

const EffectsRow = (props) => {
  const { effects } = props;
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
        <Caption level={'1'} weight={'regular'}>
          Нажмите на карточку, чтобы посмотреть её описание. Проведите слева на право, чтобы увидеть все карточки.
        </Caption>
      )}
    >

      <HorizontalScroll>
        <div className="EffectsRow__scroll">
          {(
          effects.map((effect) => {
            if (effect.name === 'GPtoday') {
              return (
              /*                <Tooltip
                  key={`BalanceItem__${effect.name}`}
                  text="Это эффект профиля. Нажмите на него, чтобы открыть."
                  isShown={tooltipsStory2.GPeffect && !tooltipsStory2.GPeffectCompleted && effect.name === 'GPtoday' && !popoutMainView}
                  onClose={onCloseTooltipEffect}
                  offsetX={12}
                > */
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
              // </Tooltip>
              );
            } if (effect.name === 'Tax') {
              return (
              /*                <Tooltip
                  key={`BalanceItem__${effect.name}`}
                  text="Если Вы пропустите ежедневный тест, правительство спишет с Вашего монетного счёта налог."
                  isShown={tooltipsStory1.taxEffect && effect.name === 'Tax' && !popoutMainView}
                  onClose={() => onCloseTooltipBalance(2)}
                  offsetX={12}
                > */
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
              // </Tooltip>
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
    count: PropTypes.number,
    currency: PropTypes.string,
    icon: PropTypes.any,
    description: PropTypes.string,
  })).isRequired,
};
EffectsRow.defaultProps = {};
export default EffectsRow;
