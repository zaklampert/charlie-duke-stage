import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default ({content, title, subtitle, showTitle}) => (
  <div className={css(styles.defaultLayout)}>
    { (showTitle) ?
      <span>
        <h1 style={{
          textTransform: 'uppercase',
          marginBottom: '0px',
          paddingBottom: '0px',
        }}>{title}</h1>
        <h2 style={{
          fontWeight: 'lighter',
          textTransform: 'uppercase',
          marginTop: '0px',
          paddingTop: '0px',
        }}>&mdash; {subtitle}</h2>
      </span> :
    null }
    <div dangerouslySetInnerHTML={{__html: content}} />
  </div>
)


const styles = StyleSheet.create({
  defaultLayout: {
    maxWidth: '1440px',
    margin: '0 auto',
    clear: 'both',
    padding: '15px 100px',
    '@media (max-width: 670px)':{
      padding: '22px 22px 100px 22px',
    }
  },
  half: {
    width: '48%',
    margin: '0 1%',
    display: 'inline-block',
  },
  image: {
    maxWidth: '100%',
  }
})
