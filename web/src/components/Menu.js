import React from 'react';
import { connect } from 'react-redux';
import './Menu.css';

class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
    }
    this._renderItems = this._renderItems.bind(this);
  }
  _renderItems() {
    const { menu } = this.props;
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
      {(menu.map((item, i) => (
        <div key={`menu_item_${i}`} >
          <a style={{
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer',
              fontSize: '33px',
              padding: '8px',
              display: 'inline-block',
            }}
             href={item.url} onClick={()=>{this.setState({open: false})}}>
            {item.title}
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

const mapStateToProps = state => {
  const { menu } = state

  return {
    menu
  }
}

export default connect(mapStateToProps)(Menu);
