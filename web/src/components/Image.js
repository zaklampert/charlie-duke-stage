import React from 'react';
import AudioClip from './AudioClip';

export default class Image extends React.Component {

  render(){
    const {image,  audio} = this.props;
    return (
      <div style={{
        position: 'relative'
      }}>

        {(audio) ?
          <div  style={{
            display: 'block',
            position: 'absolute',
            bottom: '13px',
            left: '13px',
            borderRadius: '3px',
            background: 'rgba(0,0,0,.25)',
            color: 'white',
            padding: '3px 8px',
            fontSize: '14px',
          }}>
           <AudioClip source={audio} />
         </div> : null }
        <img src={image}
             data-image={image}
             alt="Charlie Duke"
             style={{
                maxWidth: '100%',
                maxHeight: '60vh',
                minHeight: '20vh',
                minWidth: '250px',
                cursor:'zoom-in'
               }}
           />
       </div>
    )
  }
}
