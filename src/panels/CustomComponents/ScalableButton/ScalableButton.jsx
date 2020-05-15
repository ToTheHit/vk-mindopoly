import React from 'react';
import PropTypes from 'prop-types';
import './scalableButton.less';

const ScalableButton = (props) => {
  const { child, scale } = props;

  return (
    <div className="ScalableButton">

    </div>
  );
};

ScalableButton.propTypes = {
  child: PropTypes.element,
  scale: PropTypes.number.isRequired,
};
ScalableButton.defaultProps = {
  child: null,
};
export default ScalableButton;
