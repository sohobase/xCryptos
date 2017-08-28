import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

class Currency extends Component {

  static navigationOptions({ navigation }) {
    const { currency = {} } = navigation.state.params;
    return {
      title: currency.name,
      headerRight: <Button title="Refresh" />,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  // async componentWillMount() {}

  render() {
    return (
      <View style={styles.container} />
    );
  }
}

export default Currency;
