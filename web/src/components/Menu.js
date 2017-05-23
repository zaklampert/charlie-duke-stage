import React from 'react';
import './Menu.css';

const menuItems = [
  {
    label: 'About',
    href: '#about'
  },
  {
    label: 'Apollo',
    href: '#capcom',
  },
  {
    label: 'Public Speaking',
    href: '#live',
  },
  {
    label: 'Shop',
    href: '#shop',
  },
  {
    label: 'Contact',
    href: ''
  }
]

class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
    }
    this._renderItems = this._renderItems.bind(this);
  }
  _renderItems() {
    return <div style={{
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '98',
      background: 'rgba(0,0,0,.9)',
    }}>
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      textAlign: 'center',
      transform: 'translate(-50%, -50%)',
      width: '90%',
    }}>
      {(menuItems.map((item) => (
        <div key={item.label} >
          <a style={{
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer',
              fontSize: '33px',
              padding: '8px',
              display: 'inline-block',
            }}
             href={item.href} onClick={()=>{this.setState({open: false})}}>
            {item.label}
          </a>
          </div>
        )
      ))}
      </div>
    </div>
  }
  render(){
    const { open } = this.state;
    return (
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
      }}>
      <div style={{
        position: 'fixed',
        zIndex: '99',
        right: '19px',
        top: '19px',
      }}>
      <div id="nav-icon3" onClick={()=>{this.setState({open: !this.state.open})}} className={`${(open) ? 'open' : ''}`}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      </div>
         { (open) ? this._renderItems() : null }
      </div>
    )
  }
}


export default Menu;
