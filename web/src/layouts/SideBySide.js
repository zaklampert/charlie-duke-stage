import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { AudioClip, VideoPlayer } from '../components';

export default ({leftPhoto, leftCaption, rightPhoto, rightCaption, leftVideo, rightVideo, leftImageLink, rightImageLink}) => (
  <div className={css(styles.sideBySide)}>
    <div className={css(styles.half)}>
      {(leftVideo) ? <VideoPlayer video={leftVideo}/> : null}
      {(leftPhoto) ? <img alt="Charlie Duke" className={css(styles.image)} data-src={leftPhoto}  data-image={leftPhoto}/> :null }
      <div className={css(styles.caption)}  dangerouslySetInnerHTML={{__html: leftCaption}}/>
        {(leftImageLink) ? <div className={css(styles.audio)}><AudioClip source={leftImageLink} /></div> : null }

    </div>
    <div className={css(styles.half)}>
      {(rightVideo) ? <VideoPlayer video={rightVideo}/> : null }
      {(rightPhoto) ? <img alt="Charlie Duke" className={css(styles.image)} data-src={rightPhoto} data-image={rightPhoto} /> : null }
      <div className={css(styles.caption)} dangerouslySetInnerHTML={{__html: rightCaption}}/>
      {(rightImageLink) ? <div className={css(styles.audio)}><AudioClip source={rightImageLink} /> </div>: null }
    </div>
  </div>
)


const styles = StyleSheet.create({
  sideBySide: {
    maxWidth: '1440px',
    margin: '0 auto',
    // fontSize: '12px',
    padding: '0px 38px',
    clear: 'both',
    display: 'flex',
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
  },
  image: {
    maxWidth: '100%',
    maxHeight: '70vh',
    cursor: 'zoom-in',
  }
})
