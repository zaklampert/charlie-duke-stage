import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default () => (
  <div className={css(styles.modal)}>
    MODAL
  </div>
)

const styles = StyleSheet.create({
  'modal':{
    position: 'fixed',
    zIndex: '99',
    background: 'rgba(0,0,0,.9)',
    width: '100vw',
    height: '100vh',
  }
})
