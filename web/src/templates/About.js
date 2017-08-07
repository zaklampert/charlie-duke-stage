import React from 'react';
import { css } from 'aphrodite';
import $ from 'jquery';
import {buttons} from '../layouts/SectionIntro';
import { FullPageSlide, FullPageSection, ImageWithText, SideBySide, Default, FullImage, Quote } from '../layouts';

const Layouts = {
  ImageWithText,
  SideBySide,
  Default,
  FullImage,
  Quote,
};

export default ({page}) => (
  <FullPageSection>
    <FullPageSlide>
      <Quote
        content={page.content}
      />
      <div style={{textAlign: 'center'}}>
        <div className={css(buttons.button)} onClick={()=>{$.fn.fullpage.moveSlideRight();}}>
          About Charlie
        </div>
      </div>
    </FullPageSlide>
        {page.children && page.children.length > 0 && page.children.map(child => {
          return <FullPageSlide
            key={child.slug}
            theme="light">
            {React.createElement(Layouts[child.template], child)}
          </FullPageSlide>
        })}
  </FullPageSection>
);
