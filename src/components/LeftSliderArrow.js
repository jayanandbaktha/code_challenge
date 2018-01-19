import React from 'react';

const LeftSliderArrow = ({ prevSlide }) => {
  return (
    <div className="slider-left-arrow" onClick={prevSlide}>
      <img src="img/slider-left-arrow.svg" />
    </div>
  );
}

export default LeftSliderArrow;
