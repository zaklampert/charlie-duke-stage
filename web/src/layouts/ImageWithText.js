import React from 'react';
import { AudioClip, VideoPlayer } from '../components';
import { StyleSheet, css } from 'aphrodite';
// import {showModal} from '../actions';
import {connect} from 'react-redux';

const ImageWithText = ({image, content, caption, imageLink, dispatch, imageWidth, imageHeight, video}) => {
  // const isPortrait = ((imageWidth / imageHeight) < 1);

  return <div className={css(styles.imageWithText)}>
    <div style={{
      margin: '0 auto',
      display: (video && video.length > 0) ? 'block' : 'inline-block',
      position: 'relative',
      // padding: '67px 12px',
      left: '50%',
      transform: "translateX(-50%)"
    }}>
      {(video && video.length > 0) ?
        <VideoPlayer video={video}/> :
        <div style={{
          display: 'table',
          maxWidth: '100%',
          maxHeight: '60vh',
          margin: '0 auto',
        }}>
        <img data-src={image}
             data-image={image}
             alt="Charlie Duke"
             style={{
                maxWidth: '100%',
                maxHeight: '60vh',
                minHeight: '20vh',
                cursor:'zoom-in'
               }}
           />

             <div  style={{
               display: 'table-caption',
               captionSide: 'bottom',
               width: '100%',

             }}> <div dangerouslySetInnerHTML={{__html: content}}></div>
             {(imageLink) ?
               <span  style={{
                 display: 'block',
                 margin: '0 auto',
                 textAlign: 'center',

               }}>
                <AudioClip source={imageLink} /> </span>: null }
            </div>
         </div>
      }
    </div>
  </div>
}

const styles = StyleSheet.create({
  imageWithText: {
    maxWidth: '1440px',
    margin: '0 auto',
  }
})

export default connect()(ImageWithText);
