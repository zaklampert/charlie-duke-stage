import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { VideoPlayer, Image } from '../components';

export default ({leftPhoto, leftCaption, rightPhoto, rightCaption, leftVideo, rightVideo, leftImageLink, rightImageLink}) => (
  <div className={css(styles.sideBySide)}>
    <div className={css(styles.half)}>
      <div style={{display: 'table', margin: '0 auto'}}>

      {(leftVideo) ? <VideoPlayer video={leftVideo}/> : null}
      {(leftPhoto) ? <Image image={leftPhoto} audio={leftImageLink} /> :null }
      <div style={{display: (!leftPhoto) ? 'block':'table-caption',  captionSide: 'bottom',}}>
        <div className={css(styles.caption)}  dangerouslySetInnerHTML={{__html: leftCaption}}></div>
      </div>
    </div>



    </div>
    <div className={css(styles.half, styles.lastHalf)}>
      <div style={{display: 'table', margin: '0 auto'}}>

      {(rightVideo) ? <VideoPlayer video={rightVideo}/> : null}
      {(rightPhoto) ? <Image image={rightPhoto} audio={rightImageLink} /> :null }
      <div style={{display: (!rightPhoto) ? 'block' : 'table-caption', captionSide: 'bottom',}}>
        <div className={css(styles.caption)}  dangerouslySetInnerHTML={{__html: rightCaption}}></div>
      </div>
    </div>



    </div>
  </div>
)


const styles = StyleSheet.create({
  sideBySide: {
    maxWidth: '1440px',
    margin: '0 auto',
    // fontSize: '12px',
    padding: '0px 38px',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  caption: {
    padding: '5px 0px',
    textAlign: 'left',

  },
  audio: {
    textAlign: 'center',
  },
  half: {
    width: '48%',
    textAlign: 'center',
    '@media(max-width: 670px)':{
      width: '100%',
    }
  },
  lastHalf: {
    '@media(max-width: 670px)': {
      padding: ' 5px 0px 67px 0px',
    }
  },
  image: {
    maxWidth: '100%',
    maxHeight: '70vh',
    cursor: 'zoom-in',
  }
})
