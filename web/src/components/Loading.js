import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import '../css/progressBar.css';

export default () => (
  <div>
    <div className="progress">
      <div className="indeterminate"></div>
    </div>
    <div className={css(styles.loading)}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '75%',
        fontSize: '33px',
        textAlign: 'center',

      }}>"It's hard to describe the vitality of darkness..."</div>
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
