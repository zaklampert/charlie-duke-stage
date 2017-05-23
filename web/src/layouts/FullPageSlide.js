import React from 'react';

export default class FullPageSlide extends React.Component{
  render(){
    const { children, background, theme, backgroundPosition } = this.props;
    return (
      <div className="slide" style={{
        backgroundImage: `url("${background}")`,
        paddingBottom: '76px',
        backgroundPosition: backgroundPosition || 'center center',
        // XXX: Smarter theming
        backgroundColor: (theme === "light") ? 'white' : 'initial',
        backgroundSize: 'cover',
        color: (theme === "light") ? 'black' : 'white',
      }}>
      <div>
        {children}
      </div>
      </div>
    )
  }
}
