import React from 'react';
import Helmet from 'react-helmet';
import $ from 'jquery';
import { TweenMax } from 'gsap';
import { connect } from 'react-redux'
// eslint-disable-next-line
import { fullpage } from 'fullpage.js';
import { Nav, InteriorNav, Modal, Menu } from './components';
import { About, Hero, Story, Shop } from './templates';
import * as actions from './actions';
import { Loading } from './components';
import Intense from './lib/intense.js';

const Templates = {
  About,
  Hero,
  Story,
  Shop,
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentIndex: null,
      title: "Charlie Duke",
      fullpageReady: false,
    }
    this._animateIntros = this._animateIntros.bind(this);
  }
  _animateIntros(index, nextIndex) {
    TweenMax.fromTo(`.sectionIntroButton_${nextIndex - 1}`,1.25, {autoAlpha: 0}, {autoAlpha: 1, delay: .6});
    TweenMax.staggerFromTo(`.sectionIntro_${nextIndex - 1}`, 1, {opacity:0, y: -70}, {opacity:1, y:0}, .3);
  }
  componentDidUpdate(prevProps) {
    const { pages, dispatch } = this.props;
    const self = this;

    if ( !prevProps.pages.ready && pages.ready ){
    const anchors = pages.data && pages.data.map(page=>{
      return page.slug;
    });

    $('#fullpage').fullpage({
      controlArrows: false,
      scrollOverflow: true,
      menu: '#nav',
      anchors,
      // resetSliders: true,
      // resetSlidersKey: '575A8F6E-343B4941-889B3733-CAB30D72',
      easingcss3: 'ease-out',
      scrollingSpeed: 700,
      // scrollHorizontally: true,
      slidesNavigation: false,
      onLeave: function(index, nextIndex){
        setTimeout(()=>{
            dispatch(actions.updateLocation({hash: window.location.hash}));
        }, 50);

        self._animateIntros(index, nextIndex);
        self.setState({
          currentIndex: nextIndex - 2,
          title: `Charlie Duke // ${pages.data[nextIndex - 1].title}`,
          currentSectionTitle: pages.data[nextIndex - 1].title,
          currentAnchor: pages.data[nextIndex - 1].slug
        });
      },
      onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
        const numberOfSlides =  pages && pages.data && pages.data[index] && pages.data[index - 1].children.length;
        if ( slideIndex === numberOfSlides &&
            (nextSlideIndex !== numberOfSlides - 1) &&
            nextSlideIndex !== numberOfSlides ) {
          $.fn.fullpage.moveSectionDown();
        }
        setTimeout(()=>{
            dispatch(actions.updateLocation({hash: window.location.hash}));
        }, 50)


        if(nextSlideIndex > 0){

          $.fn.fullpage.setAllowScrolling(false, 'down, up');
        } else {
          $.fn.fullpage.setAllowScrolling(true, 'down, up');
        }

      },
      afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){
        self.setState({
          showInteriorNav: (slideIndex === 0 ) ? false : true,
        })
      },
      afterRender: function(){
        // Load additional dom-required libraries.
        const element = document.querySelectorAll( 'img' );
        const intenseDivs = document.querySelectorAll('*[data-intense="true"]');
        Intense( element );
        Intense( intenseDivs );
      },
    });

    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.getWPData());
  }
  render(){
    const { currentIndex, title, currentSectionTitle } = this.state;
    const { pages, modal, location } = this.props;
    const anchors = pages.data && pages.data.map(page=>{
      return page.slug;
    });
    const storyPages = pages.data && pages.data.filter((page)=> {return page.template === "Story" || page.template === "About"});

    const showNav = (location.section === "charlie-duke" || location.section === "shop") ? false : (currentIndex > -1 && !location.slide);
    const showInteriorNav = (location.slide);
  return (
      <div id="root" style={{
        fontFamily: `"futura-pt", sans-serif`,
        color: 'white',
        fontSize: '18px',
        background: '#171717'
      }}>
      {(modal.show) ? <Modal content={modal.content}/> : null}
      <Helmet
        title={title}
      >
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://js.stripe.com/v3/"></script>
      </Helmet>

      {(!pages.ready) ?
        <Loading /> :
        <span>
          {(!showInteriorNav) ? <Menu /> : null }
          <Nav
            show={showNav}
            anchors={anchors}
            currentIndex={currentIndex}
            storyPages={storyPages}
          />
          {(showInteriorNav) ?
            <InteriorNav
              currentSectionTitle={currentSectionTitle}
              currentAnchor={location.section}
              currentIndex={currentIndex}
              currentSlide={location.slide}
              totalSlides={pages && pages.data && pages.data[currentIndex] && pages.data[currentIndex + 1].children.length}
            /> : null}

          <div id="fullpage">
            {pages && pages.data && pages.data.map(page=>(
              React.createElement(Templates[page.template], {key: page.slug, page})
            ))}

          </div>
        </span>
        }
      </div>
    )
  }
}


const mapStateToProps = state => {
  const { pages, modal, location } = state

  return {
    pages,
    modal,
    location
  }
}

export default connect(mapStateToProps)(App)
