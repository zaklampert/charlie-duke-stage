import React from 'react';
import { VideoPlayer, Image } from '../components';
import { StyleSheet, css } from 'aphrodite';
// import {showModal} from '../actions';
import {connect} from 'react-redux';


const ImageWithText = ({image, content, caption, imageLink, dispatch, imageWidth, imageHeight, video}) => {
  // const isPortrait = ((imageWidth / imageHeight) < 1);
  const isVideo = (video && video.length > 0)
  return (
    <div className={css(styles.imageWithText)}>
      <div style={{
        margin: '0 auto',
        display: (isVideo) ? 'block' : 'inline-block',
        position: 'relative',
      }}>
        <div style={{
          display: (isVideo) ? 'block' : 'table',
          maxWidth: '100%',
          maxHeight: (isVideo) ? 'inherit' : '60vh',
          margin: '0 auto',
        }}>
          {(isVideo) ?
            <VideoPlayer video={video}/> :

            <Image
              image={image}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              audio={imageLink}
            />
          }

               <div  style={{
                 display: (isVideo) ? 'block' : 'table-caption',
                 captionSide: 'bottom',
                 width: '100%',

               }}>
               <div dangerouslySetInnerHTML={{__html: content}} className={css(styles.content)} style={{textAlign: 'left'}}></div>

              </div>
           </div>

      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  imageWithText: {
    maxWidth: '1440px',
    margin: '0 auto',
    textAlign: 'center',
    position: 'relative',
  },
  content: {
    '@media(max-width: 670px)': {
      padding: '0px 9px 67px 9px',
    }
  }
})

export default connect()(ImageWithText);
