import React from 'react';
import Helmet from 'react-helmet';
import $ from 'jquery';
import { TweenMax } from 'gsap';
import { connect } from 'react-redux'
// eslint-disable-next-line
import { fullpage } from 'fullpage.js';
// eslint-disable-next-line
import ua from 'universal-analytics';
import { Nav, InteriorNav, Modal, Menu } from './components';
import { About, Hero, Story, Shop } from './templates';
import * as actions from './actions';
import { Loading } from './components';
import Intense from './lib/intense.js';
import imagesloaded from 'imagesloaded';

const UA_ID = 'UA-16122526-34';

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
      allImagesLoaded: false,
    }
    this._animateIntros = this._animateIntros.bind(this);
  }
  _animateIntros(index, nextIndex) {
    TweenMax.fromTo(`.sectionIntroButton_${nextIndex - 1}`,1.25, {autoAlpha: 0}, {autoAlpha: 1, delay: .6});
    TweenMax.staggerFromTo(`.sectionIntro_${nextIndex - 1}`, 1, {opacity:0, y: -70}, {opacity:1, y:0}, .3);
  }
  componentDidUpdate(prevProps) {
    const { pages, dispatch } = this.props;
    const { allImagesLoaded } = this.state;
    const self = this;

    if ( !prevProps.pages.ready && pages.ready ){
    const anchors = pages.data && pages.data.map(page=>{
      return page.slug;
    });
    const visitor = ua(UA_ID);
    const imgLoad = imagesloaded(document.getElementById('fullpage'), {background: true});
    let imgCount = 0;
    imgLoad.on('progress', (instance, image) => {
      const totalLength = instance.images.length;
      if (image.isLoaded){
        imgCount += 1
      }
      if(!allImagesLoaded){
        this.setState({
          percentageLoaded: (imgCount / totalLength) * 100,
        });
      }

    });
    imgLoad.on('always', ()=>{
      this.setState({
        allImagesLoaded: true,
      });
      $('#fullpage').fullpage({
        controlArrows: false,
        scrollOverflow: true,
        menu: '#nav',
        anchors,
        lazyLoading: false,
        easingcss3: 'ease-out',
        scrollingSpeed: 700,
        slidesNavigation: false,
        normalScrollElements: '.normal',
          onLeave: function(index, nextIndex){
          setTimeout(()=>{
              dispatch(actions.updateLocation({
                hash: window.location.hash,
                page: pages.data[nextIndex - 1],
                visitor
              }));
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
              dispatch(actions.updateLocation({
                hash: window.location.hash,
                page: pages.data[index - 1].children[nextSlideIndex - 1],
                visitor,
              }));
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
          element && element.length > 0 && Intense( element );
          intenseDivs && intenseDivs.length > 0 &&  Intense( intenseDivs );
        },
      });
    })
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.getWPData());
  }
  render(){
    const { currentIndex, title, currentSectionTitle, allImagesLoaded, percentageLoaded } = this.state;
    const { pages, modal, location } = this.props;
    const anchors = pages.data && pages.data.map(page=>{
      return page.slug;
    });
    const storyPages = pages.data && pages.data.filter((page)=> {return page.template === "Story" || page.template === "About" || page.template === "Shop"});

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

        <script src="https://js.stripe.com/v3/"></script>
      </Helmet>

      {(!pages.ready) ?
        <Loading /> :
        <span>
        {(!allImagesLoaded) ? <Loading percentageLoaded={percentageLoaded}/> : null }
        {/* <Loading percentageLoaded={percentageLoaded}/> */}
          {(!showInteriorNav && allImagesLoaded) ? <Menu /> : null }
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
              arrowColor={location.page && location.page.navArrowColor}
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

const instantiateFullPage = ()=>{

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
