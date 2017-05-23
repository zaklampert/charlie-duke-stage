import { combineReducers } from 'redux';

import pages from './pages';
import events from './events';
import products from './products';
import modal from './modal';
import menu from './menu';
import location from './location';

const rootReducer = combineReducers({
  pages,
  modal,
  menu,
  location,
  events,
  products,
})

export default rootReducer
