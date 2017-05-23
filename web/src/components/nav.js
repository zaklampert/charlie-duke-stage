import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export const formatOrderForMenu = (order) => {
  return "0" + (order-1);
}

export default ({show, currentIndex, anchors, storyPages}) => {
  return (
    <div id="nav" className={css(
      show ? styles.nav : styles.hidden
    )}>
      <div style={{
        position: "relative",
        height: "100vh",
      }}>
      <div className={css(styles.navItems)}>
        <div data-menuanchor="top"
             className="active" style={{display: 'none'}}>
             <a href="#top">First section</a>
        </div>
        {storyPages && storyPages.map((page, i) => (
          <div key={page.slug} style={{height: 80 / storyPages.length + 'vh' }} className={css(styles.navItem)} data-menuanchor={page.slug}>
            <a className={css(styles.navLink)} href={`#${page.slug}`} style={{
              color: (currentIndex === i) ? 'white' : '#848484'
            }}>
              <div style={{margin: '8px 0'}}>
                {formatOrderForMenu(page.order)}
              </div>
              {page.title}
            </a>
            <span className={css(styles.bullet)} style={{
              background: (currentIndex === i) ? 'white' : '#6b6b6b'
            }}></span>
          </div>
        ))}
      </div>
      </div>
    </div>
);
}


const styles = StyleSheet.create({
  hidden: {
    display: 'none',
  },
  nav: {
    position: 'fixed',
    zIndex: '89',
    color: 'white',
    left: '33px',
    '@media (max-width: 868px)':{
      display: 'none'
    }
  },
  navItems: {
    position: 'absolute',
    display: 'block',
    height: '80%',
    top: '50%',
    transform: 'translateY(-50%)',
    borderRight: '1px solid #6b6b6b',
  },
  navItem: {
    display: 'block',
    // height: ,
    position: 'relative',
    width: '114px',
    marginRight: '25px',
  },
  bullet: {
    display: 'block',
    position: 'absolute',
    width: '8px',
    right: '-29px',
    top: '50%',
    borderRadius: '100%',
    height: '8px',
  },
  navLink: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    display: 'block',
    transform: 'translateY(-50%)',
    textAlign: 'right',
    textDecoration: 'none',

  }
});
