import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import $ from 'jquery';
import {formatOrderForMenu} from '../components/nav';

export default ({order, title, copy, buttonText}) => (
  <div className={css(styles.sectionIntro)}>
    <div className={`sectionIntro_${order} ` + css(styles.order)}>{formatOrderForMenu(order)}</div>
    <div className={`sectionIntro_${order} ` + css(styles.title)}>{title}</div>
    <div className={`sectionIntro_${order} ` + css(styles.copy)}><span dangerouslySetInnerHTML={{__html: copy}}/></div>
    <div className={`sectionIntroButton_${order} ` + css(buttons.button)} onClick={()=>{$.fn.fullpage.moveSlideRight();}}>
      {buttonText}
    </div>
  </div>
);

export const buttons = StyleSheet.create({
  button: {
    border: '3px solid white',
    padding: '22px 44px',
    display: 'block',
    maxWidth: '275px',
    margin: '20px auto',
    cursor: 'pointer',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: '22px',
    textAlign: 'center',
    ':hover':{
      backgroundColor: 'white',
      color: 'black',
    },
    '@media (max-width: 670px)':{
      fontSize: '18px',
      border: '2px solid white',
      margin: '10px auto',
      padding: '15px 30px',
      maxWidth: '60%'
    }
  }
})

const styles = StyleSheet.create({
  sectionIntro: {
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto',
  },
  order: {
    fontSize: '22px',
    marginBottom: '30px',
  },
  title: {
    fontSize: '66px',
    fontFamily: '"futura-pt-bold"',
    fontWeight: '700',
    '@media (max-width: 670px)': {
      fontSize: '44px',
    }
  },
  copy: {
    fontSize: '22px',
    margin: '60px 0px',
  },

})
