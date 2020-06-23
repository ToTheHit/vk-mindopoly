import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card, classNames, Div, SimpleCell,
} from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import bridge from '@vkontakte/vk-bridge';
import globalVariables from '../../../../../../GlobalVariables';
import './effect.css';

const Effect = (props) => {
  const {
    count, currency, icon, description, name,
  } = props;
  const [renderedIcon, setRenderedIcon] = useState(null);
  const scheme = useSelector((state) => state.schemeChanger.scheme);
  const dispatch = useDispatch();

  function openModal() {
    bridge.send('VKWebAppTapticImpactOccurred', { style: 'light' });
    dispatch({
      type: 'OPEN_MODAL',
      payload: globalVariables.mainViewModal(name),
    });
  }


  useEffect(() => {
    let render = null;
    if (typeof icon === 'string') {
      render = (
        <div
          style={{ backgroundImage: `url(${icon})` }}
          className="Effect__icon"
        />
      );
    } else {
      render = icon;
    }
    setRenderedIcon(render);
  }, [icon]);

  return (
    <Card
      mode="shadow"
      onClick={() => openModal()}
      className={classNames('Effect__cardEffect', { 'Effect__cardEffect-dark': scheme === 'space_gray' })}
    >
      <SimpleCell
        className="Effect__content"
        disabled
        before={(
          <div className="Effect__icon">
            {renderedIcon}
          </div>
        )}
        description={(
          <div className="Effect__content--description">
            {description}
          </div>
        )}
      >
        <div>
          {`${count} ${currency}`}
        </div>
      </SimpleCell>
    </Card>
  );
};

Effect.propTypes = {
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  currency: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
Effect.defaultProps = {
};
export default Effect;
