import React, { Component } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Main extends Component {

  static navigationOptions = {
    title: 'Crypto Currencies',
  };

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
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Button
          onPress={() => navigate('Currencies')}
          title="Currencies"
        />
      </View>
    );
  }
}

export default Main;
