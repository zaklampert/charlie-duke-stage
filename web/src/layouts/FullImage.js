import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default ({image}) => (
  <div className={css(styles.fullImage)} data-intense="true" style={{backgroundImage: `url(${image})`}} data-image={image}></div>
)

const styles = StyleSheet.create({
  fullImage: {
    backgroundSize: 'cover',
    backgroundPosition: 'center, center',
    width: '100vw',
    height: '100vh',
  }
})
