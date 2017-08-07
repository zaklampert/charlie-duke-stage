import React from 'react';
import App from './app';

const SUPER_SECRET_PASSWORD = "Charlie"

export default class Root extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      allow: false,
      password: null,
    }
    this._handleChange = this._handleChange.bind(this);
  }
  _handleChange(e){
    if (e.target.value === SUPER_SECRET_PASSWORD) {
      window.localStorage.setItem('cdukepassword', SUPER_SECRET_PASSWORD);
      this.setState({allow: true})
    }
  }
  componentWillMount(){
  const pw = window.localStorage.getItem('cdukepassword');
  if (pw === SUPER_SECRET_PASSWORD){
    this.setState({
      allow: true,
    })
  }
  }
  render(){
    const { allow } = this.state;
    if (allow) {
      return <App />
    }
    return (
      <div style={{
        fontFamily: 'Helvetica, sans-serif',
        color: 'white',
        background:' black',
        width: '100vw',
        height: '100vh',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '300px',
          textAlign: 'center',
          fontSize: '11px',
          fontWeight:'100'
        }}>
        <img src="/apollo_16_icon.png"/><br/><br/>
        This site is locked.<br/><br/>
        <input type="password"
               placeholder="Enter Password"
               onChange={this._handleChange}
         />
        </div>
      </div>
    )
  }
}
