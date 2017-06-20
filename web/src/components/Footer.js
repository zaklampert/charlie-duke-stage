import React from 'react';
import moment from 'moment';
export default()=>(
  <div style={{
    padding: '10px',
  }}>
    <span style={{
      color: '#adadad',
    }}>
      &copy; {moment().format('YYYY')} Charlie Duke enterprises
    </span> | <a style={{color:'white', textDecoration: 'none'}} href="http://chaco.cc">chaco.cc</a>
  </div>
)
