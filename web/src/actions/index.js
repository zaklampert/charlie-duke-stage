import { mapDataToPage, mapEvents, mapProducts } from '../data';
import { pauseHowls } from '../helpers';
import 'isomorphic-fetch';

export const POPULATE_MENU = 'POPULATE_MENU';
export const POPULATE_PAGES = 'POPULATE_PAGES';
export const POPULATE_EVENTS = 'POPULATE_EVENTS';
export const POPULATE_PRODUCTS = 'POPULATE_PRODUCTS';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';

const API_URL = 'https://charlieduke.wpengine.com';
const apiOptions = {
  // headers:{
  // 'Access-Control-Allow-Origin':'*',
  // 'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  // },
  // method: 'GET',
  // headers: {
  //   Accept: 'application/json',
  // },
  mode: 'cors',
}

export const onStripeToken = ({
    amount,
    success,
    error,
    inscription,
    product_description
  }, token, args ) => {

  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  fetch(`${API_URL}/wp-json/duke/v1/stripe/charge`, {
     method: 'POST',
     headers: myHeaders,
     mode: 'cors',
     cache: 'default',
     body: JSON.stringify({
       token: token.id,
       amount,
       inscription,
       product_description,
       shipping: {
         name: args.shipping_name,
         address: {
           line1: args.shipping_address_line1,
           line2: args.shipping_address_line2,
           postal_code: args.shipping_address_zip,
           state: args.shipping_address_state,
           city: args.shipping_address_country_code,
         }
       },
       email: token.email,
     }),
   }).then(response => {
     response.json().then(data => {
       success(data);
     });
   }).catch(e=>{
     error(e);
   })
}


const receivePages = (json) => ({
  type: POPULATE_PAGES,
  json,
});

const receiveEvents = (events) => ({
  type: POPULATE_EVENTS,
  events,
});

const receiveProducts = (products) => ({
  type: POPULATE_PRODUCTS,
  products,
})

const receiveLocation = ({section, slide})=>({
  type: UPDATE_LOCATION,
  section,
  slide,
});

export const updateLocation = ({hash}) => dispatch => {
  pauseHowls();
  const section = (hash.lastIndexOf("/") > -1) ? hash.substring(hash.lastIndexOf("#")+1,hash.lastIndexOf("/")) : hash.split('#')[1];
  const slide = hash.split('/')[1] || null;
  return dispatch(receiveLocation({section, slide}))
}

export const showModal = ({content}) => dispatch => {
  // $.fn.fullpage.setAllowScrolling(false);
  //
  // const viewer = ImageViewer(); //options is optional parameter
  // viewer.show(content); //second paramter is optional

  // return dispatch({
  //   type: SHOW_MODAL,
  //   content
  // })
}

const mapWPData = (pages, menu) => dispatch => {
  const mappedMenuData = menu && menu.map(item=>{
    const pageMatch = pages && pages.find(page=>{
      return item.object_id === page.id;
    });
    pageMatch && Object.assign(item, {
      page_data: pageMatch
    });

    item && item.children && item.children.map(child => {
      const childPageMatch = pages && pages.find(page=>{
        return child.object_id === page.id;
      })
      return childPageMatch && Object.assign(child, {
        page_data: childPageMatch
      });
    });
    return item
  })
  return dispatch(receivePages(mapDataToPage(mappedMenuData)));
}
const getEvents = () => dispatch => {
    return fetch(`${API_URL}/wp-json/wp/v2/event?filter%5Borderby%5D=meta_value_num&meta_key=event_date&order=asc`, apiOptions)
    .then(response => response.json())
    .then(events => {
      dispatch(receiveEvents(mapEvents(events)));
    })
    .catch(e => {
      console.log(e);
    })
}

const getProducts = () => dispatch => {
  return fetch(`${API_URL}/wp-json/wp/v2/product?per_page=100&_embed`, apiOptions)
    .then(response => response.json())
    .then(products => {
      dispatch(receiveProducts(mapProducts(products)));
    });
};

const getPages = (menu) => dispatch => {
  return fetch(`${API_URL}/wp-json/wp/v2/pages?per_page=100&_embed`, apiOptions)
    .then(response => response.json())
    .then(pages => {
      dispatch(mapWPData(pages, menu))
    }).catch(err => {
      console.log(err);
    })
}

export const getWPData = () => dispatch => {
  return fetch(`${API_URL}/wp-json/wp-api-menus/v2/menu-locations/site-menu`, apiOptions)
    .then(response => response.json())
    .then(json => {
      dispatch(getPages(json));
    })
    .then(()=>{
      dispatch(getEvents());
    }).then(()=>{
      dispatch(getProducts());
    })
    .catch(err=>{
      console.log(err);
    })
}
