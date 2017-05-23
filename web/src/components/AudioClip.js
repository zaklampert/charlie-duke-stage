import React from 'react';
import { Howl } from 'howler';
import { pauseHowls } from '../helpers';
function formatTime(seconds)
{
    // Hours, minutes and seconds
    let time = Math.round(seconds);
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

export default class AudioClip extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      playing: false,
      ended: false,
      currentPosition: 0,
      paused: false,
    }
    this.interval = setInterval(this._getPosition.bind(this), 500);
    this._loadAudio = this._loadAudio.bind(this);
    this._playAudio = this._playAudio.bind(this);
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }
  _getPosition(){
    const {playing, paused, audio} = this.state;

    audio &&  playing && !paused && this.setState({
      currentPosition: audio.seek()
    })
  }
  _loadAudio(){
    const {source} = this.props;
    const self = this;
    pauseHowls();
    const audio = new Howl({
      src: [source],
      autoplay: true,
      onplay: ()=>{
        self.setState({
          playing: true,
          paused: false,
        })
      },
      onstop: ()=>{
        self.setState({
          playing: false,
          paused: false,
        })
      },
      onload: ()=>{
        self.setState({
          loaded: true,
        })
      },
      onend: ()=>{
        self.setState({
          ended: true,
          playing: false,
        })
      },
      onpause: ()=>{
        self.setState({
          // playing: false,
          paused: true,
        })
      }
    });
    this.setState({
      audio,
      ready: true,
    })
  }
  _playAudio(){
    const {audio} = this.state;
    pauseHowls();
    audio.play();
  }
  render(){
    const { loaded, currentPosition, ended, paused, ready, audio, playing } = this.state;

    if(!ready){
      return (
        <span>
          <i onClick={()=>this._loadAudio()} className="fa fa-headphones" style={{cursor:'pointer', paddingRight:'5px'}} aria-hidden="true"></i>
        </span>
      )
    }
    if (!loaded) {
      return (
        <span>
          <i className="fa fa-spinner fa-pulse fa-fw"></i>
        </span>
      )
    }

      return (
        <span >
          {(ended && !playing) ? <i onClick={()=>this._playAudio()} className="fa fa-repeat" style={{cursor:'pointer', paddingRight:'5px'}} aria-hidden="true"></i> : null }
          {(paused) ?
            <i onClick={()=>this._playAudio()} className="fa fa-play-circle" style={{cursor:'pointer', paddingRight:'5px'}} aria-hidden="true"></i> :
            <i onClick={()=>audio.pause()} className="fa fa-pause-circle" style={{cursor:'pointer', paddingRight:'5px'}} aria-hidden="true"></i>
          }
          {/* <i onClick={()=>{audio.stop()}} className="fa fa-stop-circle" aria-hidden="true"></i> */}
          <span > {`${formatTime(currentPosition)} / ${formatTime(audio.duration())}`}</span>
        </span>
      )


  }
}
