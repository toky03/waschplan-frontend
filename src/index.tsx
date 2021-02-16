import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore, applyMiddleware } from 'redux';
import combineReducers from './reducers';
import { Provider } from 'react-redux';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
import {​​​​​ CombinedState }​​​​​ from '@reduxjs/toolkit';

let store: CombinedState<any>;

if(process.env.NODE_ENV === 'development'){
    store = createStore(combineReducers, composeWithDevTools(applyMiddleware(thunk)));
} else{
    store = createStore(combineReducers);
}

export default store;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorkerRegistration.register();
