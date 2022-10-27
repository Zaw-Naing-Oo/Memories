import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { GoogleOAuthProvider } from '@react-oauth/google'
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import './index.css'

import reducers from './reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId='639556515777-994g5ech9br4e0k9qtsn58skjdr67qgd.apps.googleusercontent.com'>
      <React.StrictMode>
        <Provider store={store} >
          <App />
        </Provider>
      </React.StrictMode>
    </GoogleOAuthProvider>
  </BrowserRouter>
);
