import React from 'react';
import { FullPageSlide, FullPageSection } from '../layouts';
import { StyleSheet, css } from 'aphrodite';

// import {buttons} from '../layouts/SectionIntro';

export default ({page}) => (
  <FullPageSection>
    <FullPageSlide
      theme="dark"
      background={page.background}
      backgroundPosition="76% center"
    >
      <div className={css(styles.title)}>
        {page.title}
      </div>
      {/* <div className={css(buttons.button)} onClick={()=>{$.fn.fullpage.moveSectionDown()}}>
        The Story
      </div> */}
    </FullPageSlide>
  </FullPageSection>
)

const styles = StyleSheet.create({
  title: {
    fontSize: '78px',
    textAlign: 'center',
    fontFamily: '"futura-pt-bold", sans-serif',
  }
})
