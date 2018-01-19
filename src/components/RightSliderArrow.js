import React from 'react';

const RightSliderArrow = ({ nextSlide }) => {
  return (
    <div className="slider-right-arrow" onClick={nextSlide}>
      <img src="img/slider-right-arrow.svg" />
    </div>
  );
}

export default RightSliderArrow;
