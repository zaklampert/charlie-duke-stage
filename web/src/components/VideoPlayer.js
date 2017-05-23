import React from 'react';
import URI from 'urijs';

class VideoPlayer extends React.Component{
  constructor(props){
    super(props);
    const { video } = props;
    const domain = URI(video).domain();
    let videoId = '';
    let iframeSrc = '';

    switch(domain) {
      case 'vimeo.com':
      videoId = URI(video).segment()[0];
      iframeSrc = `https://player.vimeo.com/video/${videoId}?badge=0"`;
      break;
      case 'youtube.com':
      default:
      videoId = URI(video).query(true).v
      iframeSrc = `https://www.youtube.com/embed/${videoId}?ecver=1&iv_load_policy=3&modestbranding=1&showinfo=0&rel=0`;
      break;
    }

    this.iframeSrc = iframeSrc;

  }
  render() {
    const {iframeSrc} = this;
    return (
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: '0',
        overflow: 'hidden',
      }}>
        <iframe width="100"
                height="100"
                title="video"
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                }}
                src={iframeSrc}
                frameBorder="0"
                allowFullScreen></iframe>
      </div>
    )
  }
}

export default VideoPlayer
