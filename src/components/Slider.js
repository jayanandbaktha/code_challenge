import React, { Component } from 'react';
import Slide from './Slide';
import Dots from './Dots';
import LeftSliderArrow from './LeftSliderArrow';
import RightSliderArrow from './RightSliderArrow';
import Pagestatus from './Pagestatus';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Slider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: this.props.images,
      orginalimages: this.props.images,
      index: 0,
      translateValue: 0,
      autoplay: false
    }

    document.onkeydown = (e) => {
      e = e || window.event;
      if (e.keyCode == '37') {
        //left <- show Prev image
        this.slidePrev();
      } else if (e.keyCode == '39') {
        // right -> show next image
        this.slideNext();
      }
    }
  }

  /**
   * @method:onChange
   * @description:calls when user enters the number of slides 
   */

  onChange = (e) => {
    const { images, orginalimages } = this.state;
    let newImages = [];
    this.setState({ images: orginalimages });
    if (e.target.value && e.target.value !== '') {
      for (var i = 0; i < e.target.value; i++) {
        newImages.push(orginalimages[i]);
      }     
      this.setState({ images: newImages });
    } 
    this.setState({ index: 0, translateValue: 0 });
    this.renderSlides();
  }

  /**
   * @method:renderSlides
   * @description:calls the function to load the images 
   */

  renderSlides = () => {
    const { images } = this.state;
    let slides = [];
    let len = images.length;
    for (let i = 0; i < len; i++)
      slides.push(<Slide key={i} image={images[i].image} />)

    return slides;
  }

  /**
   * @method:handleDotClick
   * @description:calls when dot is clicked
   * @param: i i.e index
   */

  handleDotClick = i => {
    const { images } = this.state;
    if (i === this.state.index)
      return

    if (i > this.state.index) {
      return this.setState({
        index: i,
        translateValue: -(i * this.slideWidth())
      })
    } else {
      this.setState({
        index: i,
        translateValue: this.state.translateValue += ((this.state.index - i) * (this.slideWidth()))
      })
    }
  } 

  /**
   * @method:renderSliderOptions
   * @description:To apply slider options to the slide
   */

  renderSliderOptions() {
    const { images, index, translateValue, autoplay } = this.state;
    if (images.length > 1) {
      return (
        <div>
          <Pagestatus imglength={images.length} index={index} />          
          <Dots index={index}
            quantity={images.length}
            dotClick={this.handleDotClick} />
          <LeftSliderArrow prevSlide={this.slidePrev} />
          <RightSliderArrow nextSlide={this.slideNext} />
        </div>
      )
    };
  }
  
  render() {
    const { images, index, translateValue, autoplay } = this.state;
    return (
      <div className="slider">
        <input type="number" className="input-number" placeholder="Enter Number" onChange={this.onChange.bind(this)}></input>
        <div className="slider-wrapper"
          style={{
            transform: `translateX(${translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}>
          {this.renderSlides()}
        </div>
        {this.renderSliderOptions()}
      </div>
    )
  }

  /**
   * @method:slidePrev
   * @description:To activate previous slide
   */


  slidePrev = () => {
    if (this.state.index === 0)
      return

    this.setState({
      translateValue: this.state.translateValue += this.slideWidth(),
      index: this.state.index -= 1
    });
  }

  /**
   * @method:slideNext
   * @description:To activate next slide
   */

  slideNext = () => {
    const { images } = this.state;
    if (this.state.index === images.length - 1) {
      return this.setState({
        translateValue: 0,
        index: 0
      });
    }

    this.setState({
      translateValue: this.state.translateValue -= this.slideWidth(),
      index: this.state.index += 1
    });
  }

  /**
   * @method:slideWidth
   * @description:To set the width of the slide
   */

  slideWidth = () => {
    const slide = document.querySelector('.slide')
    return slide.clientWidth;
  }  

} // End Class

function mapStateToProps(state) {  
  const { appReducers } = state;  
  return {
    images: appReducers.images  
  };
}

var mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Slider);
