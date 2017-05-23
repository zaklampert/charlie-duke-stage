import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import $ from 'jquery';
import '../css/chevrons.css';

const mobile = '@media (max-width: 670px)';

export default ({show, currentSectionTitle, currentAnchor, currentIndex, currentSlide, totalSlides}) => (
  <div >
    <span className={css(styles.interiorNavTop)} onClick={()=>{$.fn.fullpage.moveTo(currentAnchor, 0);}}>
      <div className="close"></div>
      {/* <i className="fa fa-caret-left" aria-hidden="true"></i> <span style={{fontWeight:'lighter'}}>0{currentIndex}</span> {currentSectionTitle} */}
    </span>
    <span className={css(styles.interiorNavBottom)}>
    <span className={css(styles.interiorNavLeft)} onClick={()=>{$.fn.fullpage.moveSlideLeft()}}>
      <span className="chevron left"></span>
    </span>
    <span className={css(styles.interiorNavNumbers)}>
      <div className={css(styles.leftNumber)}>
        {(currentSlide < 10) ? `0${currentSlide}` : currentSlide }
      </div>
      <div className={css(styles.leftDividingBar)}></div>
      <div className={css(styles.leftNumber)}>
        {(totalSlides < 10 ) ? `0${totalSlides}` : totalSlides }
      </div>
    </span>
    <span className={css(styles.interiorNavRight)} onClick={()=>{$.fn.fullpage.moveSlideRight()}}>
      <span className="chevron right"></span>
    </span>
    </span>

  </div>
)
const styles = StyleSheet.create({
  interiorNavBottom: {
    [mobile]: {
      background: 'white',
      width: '100%',
      display: 'block',
      position: 'absolute',
      height: '62px',
      zIndex: '99',
      bottom: '0px',
    }
  },
  interiorNavTop: {
    position: 'absolute',
    top: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '99',
    fontWeight: 'bold',
    color: '#848484',
    cursor: 'pointer',
    fontSize: '13px',
    [mobile]: {
      fontSize: '10px',
    }
  },
  interiorNavRight: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-32%)',
    right: '22px',
    zIndex: '99',
    fontSize: '88px',
    color: '#848484',
    cursor: 'pointer',
    [mobile]: {
      // right: '22px%',
      top: 'inherit',
      bottom: '12px',
      fontSize: '22px',
      transform :'translateX(-50%)'
    }
  },
  interiorNavLeft: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-32%)',
    left: '22px',
    zIndex: '99',
    fontSize: '88px',
    color: '#848484',
    cursor: 'pointer',
    [mobile]: {
      // right: '22px%',
      top: 'inherit',
      bottom: '12px',
      fontSize: '22px',
      transform :'translateX(-50%)'
    }
  },
  // numbers
  interiorNavNumbers: {
    position: 'absolute',
    bottom: '15px',
    left: '50%',
    transform :'translateX(-50%)',
    zIndex: '99',
    fontWeight: 'lighter',
    color: '#848484',
    [mobile]: {
      bottom: '22px',
    }
  },
  leftNumber: {
    fontSize: '16px',
    padding: '14px',
    [mobile]: {
      fontSize: '12px',
      padding: '6px',
      display: 'inline',
      verticalAlign: 'middle',
    },
  },
  leftDividingBar: {
    height: '2px',
    display: 'block',
    width: '100%',
    background: '#848484',
    [mobile]: {
      display: 'inline-block',
      height: '12px',
      width: '1px',
      verticalAlign: 'middle',

    },
  }
})
