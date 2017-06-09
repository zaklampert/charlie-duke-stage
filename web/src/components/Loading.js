import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default ({percentageLoaded}) => (
  <div style={{
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    background: 'black',
    zIndex: '9999',
    color: 'white',
  }}>
    <div className={css(styles.loading)}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '75%',
        fontSize: '33px',
        textAlign: 'center',
      }}>
      "It's hard to describe the vitality of darkness..."
      {(percentageLoaded) ?
        <div>
      <div style={{
        width: `${percentageLoaded}%`,
        transition: 'width .5s ease-in',
        background: 'white',
        display:'block',
        height:'4px',
        borderRadius: '4px',
        boxSizing: 'border-box',
        margin: '13px auto',
      }}>
      </div>
      <div style={{
        fontSize: '11px',
        fontWeight: '300',
      }}>
        {Math.round(percentageLoaded)}%
      </div>
      </div>
      : null}
    </div>
    </div>
  </div>
)

const styles = StyleSheet.create({
  loading: {
    background: 'black',
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: '76% center',
    zIndex: '1',
  }
})
