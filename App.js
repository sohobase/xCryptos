import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ServiceCryptos, ServiceStorage } from './src/services';
import { AvailableCryptos } from './src/containers';

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
      dataSource: [],
    };
  }

  async componentWillMount() {
    try {
      let dataSource = await ServiceStorage.get('cryptos');
      this.setState({ dataSource });

      dataSource = await ServiceCryptos.list();
      ServiceStorage.set('cryptos', dataSource);
      this.setState({ dataSource });
    } catch (e) {
      console.log('error', e);
    }
  }

  render() {
    const { dataSource } = this.state;

    return (
      <View style={styles.container}>
        <AvailableCryptos dataSource={dataSource} />
      </View>
    );
  }
}

export default App;
