import ReactDOM from 'react-dom';
import React from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

// import Root from './root';
import App from './app';
import reducer from './reducers/index.js'

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    {/* <Root /> */}
    <App />
  </Provider>,
  document.getElementById('app')
)
