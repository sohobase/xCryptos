import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AvailableCryptos } from './src/containers';
import { C } from './src/modules';
import { ServiceStorage } from './src/services';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
    };
  }

  async componentWillMount() {
    try {
      const cryptos = await ServiceStorage.get(C.STORAGE.CRYPTOS);
      this.setState({ ready: cryptos ? true : false });
    } catch (e) {
      console.log('error', e);
    }
  }

  render() {
    const { ready } = this.state;

    return (
      <View style={styles.container}>
        { !ready && <ActivityIndicator /> }
        { ready && <AvailableCryptos /> }
      </View>
    );
  }
}

export default App;
