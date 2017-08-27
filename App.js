import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ServiceCryptos } from './src/services';
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
    const dataSource = await ServiceCryptos.list();
    this.setState({ dataSource });
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
