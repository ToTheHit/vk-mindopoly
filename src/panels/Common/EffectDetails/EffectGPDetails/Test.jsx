import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withModalRootContext } from '@vkontakte/vkui';
import EffectGPDetailsContent from './EffectGPDetailsContent';

const Test = (props) => {
  const { updateModalHeight } = props;
  const [isLoading, setIsLodaing] = useState(true);

  function updateHe() {
    setIsLodaing(false);
  }

  useEffect(() => {
    if (!isLoading) updateModalHeight();
  }, [isLoading])

  return (
    <div className="Test">
      <EffectGPDetailsContent updateHe={updateHe} />
    </div>
  );
};

Test.propTypes = {
  // eslint-disable-next-line react/require-default-props
  updateModalHeight: PropTypes.func,
};
Test.defaultProps = {};
export default withModalRootContext(Test);
