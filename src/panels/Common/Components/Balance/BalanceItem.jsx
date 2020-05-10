import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Div, SimpleCell } from '@vkontakte/vkui';

const BalanceItem = (props) => {
  const {
    count, currency, icon, description,
  } = props;
  const [renderedIcon, setRenderedIcon] = useState(null);

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
    <Card mode="shadow">
      <Div style={{ padding: '0 12px' }}>
        <SimpleCell
          className="Balance__effect"
          disabled
          before={(
            <div className="Balance__icon">
              {renderedIcon}
            </div>
        )}
          description={
            <div className={'Balance__effect--description'}>
              {description}
            </div>

          }
        >
          <div>
            {`${count} ${currency}`}
          </div>
        </SimpleCell>
      </Div>
    </Card>
  );
};

BalanceItem.propTypes = {
  count: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  description: PropTypes.string.isRequired,
};
BalanceItem.defaultProps = {
};
export default BalanceItem;
