import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import promise from 'redux-promise';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk))
); 

const composePlugin = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// export const store = createStore(reducer, composePlugin(applyMiddleware(promise, thunk)));
// console.log(store.getState());
// const store = createStore(
//   reducer,
//   composePlugin(applyMiddleware(thunk))
//   // applyMiddleware(thunk)
// ); 

// const store = createStore(reducer, composeWithDevTools(
//   applyMiddleware(thunk),
//   // other store enhancers if any
// ));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <App/>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
  serviceWorker.unregister();
