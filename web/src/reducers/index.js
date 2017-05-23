import { combineReducers } from 'redux';

import pages from './pages';
import events from './events';
import products from './products';
import modal from './modal';
import location from './location';

const rootReducer = combineReducers({
  pages,
  modal,
  location,
  events,
  products,
})

export default rootReducer
