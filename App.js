import React from 'react';
import { Provider } from 'react-redux';

import App from './src/app';
import createStore from './src/createStore';

const store = createStore();

const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Main;
