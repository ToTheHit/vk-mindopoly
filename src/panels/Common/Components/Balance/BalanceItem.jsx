import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card, classNames, Div, SimpleCell,
} from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import globalVariables from '../../../../GlobalVariables';
import bridge from "@vkontakte/vk-bridge";

const BalanceItem = (props) => {
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
          className="Balance__icon"
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
      className={classNames('Balance__cardEffect', { 'Balance__cardEffect-dark': scheme === 'space_gray' })}
    >
        <SimpleCell
          className="Balance__effect"
          disabled
          before={(
            <div className="Balance__icon">
              {renderedIcon}
            </div>
        )}
          description={(
            <div className="Balance__effect--description">
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

BalanceItem.propTypes = {
  count: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
BalanceItem.defaultProps = {
};
export default BalanceItem;
