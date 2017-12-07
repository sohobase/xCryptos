import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import App from './src/app';
import { THEME } from './src/config';
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
      <View style={{ height: '100%' }}>
        <StatusBar backgroundColor={THEME.PRIMARY} barStyle="light-content" />
        { !store
          ? <LoadingScreen />
          :
            <Provider store={this.state.store}>
              <App />
            </Provider> }
      </View>

    );
  }
}

export default Main;
