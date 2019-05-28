import React from 'react';
import { Provider } from 'react-redux';
import { hydrate, render } from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './css/index.css';
import store from './store';
import App from './components/App';


const root = document.getElementById('root');
const renderer = root && root.hasChildNodes() ? hydrate : render;

renderer(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);

serviceWorker.unregister();
