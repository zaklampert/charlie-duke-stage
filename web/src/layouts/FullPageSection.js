import React from 'react';

export default class FullPageSection extends React.Component{
  render(){
    const { children } = this.props;
    return (
      <div className="section">
        {children}
      </div>
    )
  }
}
