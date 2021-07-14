import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { getProducts } from './actions/products.actions';
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/integration/react'; 
import expireIn from "redux-persist-transform-expire-in";

// dev tools
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const expireTime = 24 * 60 * 60 * 1000; // expire in 24h
const expirationKey = "expirationKey";


const persistConfig = { // configuration object for redux-persist
  key: 'root',
  storage, 
  transforms: [expireIn(expireTime, expirationKey, [])]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore( 
  persistedReducer, composeWithDevTools(applyMiddleware(thunk, logger))
);

const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

store.dispatch(getProducts());


ReactDOM.render(
  <Provider store ={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

