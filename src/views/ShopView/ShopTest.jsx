import React from 'react';
import PropTypes from 'prop-types';
import { Button, SimpleCell } from '@vkontakte/vkui';
import globalVariables from '../../GlobalVariables';

const ShopTest = (props) => {
  const { categories } = props;

  return (
    categories.map((item) => (
      <SimpleCell
        key={`ShopItem_${item.name}`}
        className="Shop--item"
        disabled
        after={(
          <Button
            mode="secondary"
          >
            {`${item.price} монет`}
          </Button>
        )}
        before={(
          <div className="Shop--iconOuter">
            <div className="Shop--icon" />
          </div>
        )}
      >
        {globalVariables.translateEnToRu(item.name)}
      </SimpleCell>
    ))
  );
};

ShopTest.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
};
ShopTest.defaultProps = {};
export default ShopTest;
