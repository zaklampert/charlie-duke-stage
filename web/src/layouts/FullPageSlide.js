import React from 'react';

export default class FullPageSlide extends React.Component{
  render(){
    const { children, background, theme, backgroundPosition, backgroundSize } = this.props;
    return (
      <div className="slide" style={{
        backgroundImage: `url("${background}")`,
        paddingBottom: '76px',
        backgroundPosition: backgroundPosition || 'center center',
        // XXX: Smarter theming
        backgroundColor: (theme === "light") ? 'white' : 'black',
        backgroundSize: backgroundSize || 'cover',
        backgroundRepeat: "no-repeat",
        color: (theme === "light") ? 'black' : 'white',
      }}>
      <div className=".normal">
        {children}
      </div>
      </div>
    )
  }
}
