import React, { Component } from 'react';
import { Button, View } from 'react-native';
import styles from './CurrencyScreen.style';

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
      refreshing: false,
    };
  }

  render() {
    return (
      <View style={styles.container} />
    );
  }
}

export default Currency;
