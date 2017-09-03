import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import App from './src/app';
import createStore from './src/createStore';

const store = createStore();

persistStore(store, {
  storage: AsyncStorage,
});

const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Main;
