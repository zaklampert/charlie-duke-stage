import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default ({content}) => (
  <div className={css(styles.quote)}>
    <span dangerouslySetInnerHTML={{__html: content}} />
  </div>
);


const styles = StyleSheet.create({
  quote: {
    maxWidth: '500px',
    margin: '0 auto',
    fontSize: '53px',
    padding: '18px',
    '@media (max-width: 670px)': {
      fontSize: '20px'
    }
  }
})
