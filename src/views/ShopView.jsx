import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './shopView.css';
import { View } from '@vkontakte/vkui';
import Shop from '../panels/Common/Shop/Shop';
import ShopQuestion from '../panels/Common/Shop/ShopQuestion';

const ShopView = (props) => {
  const { id } = props;
  const [activePanel, setActivePanel] = useState('Shop');
  const [questionData, setQuestionData] = useState({});

  return (
    <View className="ShopView" activePanel={activePanel} id={id}>
      <Shop id="Shop" setActivePanel={setActivePanel} setQuestionData={setQuestionData} />
      <ShopQuestion id="ShopQuestion" questionData={questionData} setActivePanel={setActivePanel} />
    </View>
  );
};

ShopView.propTypes = {
  id: PropTypes.string.isRequired,
};
ShopView.defaultProps = {};
export default ShopView;
