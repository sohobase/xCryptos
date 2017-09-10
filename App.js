import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import App from './src/app';
import { LoadingScreen } from './src/screens';
import reducer from './src/reducer';

function configureStore() {
  return new Promise((resolve) => {
    const store = createStore(
      reducer,
      undefined,
      compose(
        autoRehydrate(),
      ),
    );

    persistStore(
      store,
      { storage: AsyncStorage },
      () => resolve(store),
    );
  });
}

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: undefined,
    };
  }

  async componentWillMount() {
    this.setState({ store: await configureStore() });
  }


  render() {
    const { store } = this.state;

    return (
      !store ?
        <LoadingScreen />
        :
        <Provider store={this.state.store}>
          <App />
        </Provider>
    );
  }
}

export default Main;
