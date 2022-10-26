import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose} from 'redux';
import App from './App';
import thunk from 'redux-thunk';
import { logger } from './middlewares';
import rootReducer from './reducers/rootReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));


const composeAlt =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeAlt(
  applyMiddleware(thunk, logger)
  );



const store = createStore(
  rootReducer, composedEnhancers
  );

root.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
    
  </React.StrictMode>
);

