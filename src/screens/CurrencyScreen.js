import React, { Component } from 'react';
import { Button, View } from 'react-native';
import { C } from '../config';
import { ServiceCurrencies } from '../services';
import styles from './CurrencyScreen.style';

class CurrencyScreen extends Component {
  static navigationOptions({ navigation }) {
    const { currency = {} } = navigation.state.params;
    return {
      title: currency.name,
      // headerRight: <Button title="Alerts" />,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this._fetch();
  }

  async _fetch() {
    const { currency } = this.props.navigation.state.params;
    const data = await ServiceCurrencies.fetch(currency.symbol);
    console.log('data', data);
  }

  render() {
    return (
      <View style={styles.container} />
    );
  }
}

CurrencyScreen.propTypes = {
  navigation: C.SHAPE.NAVIGATION,
};

CurrencyScreen.defaultProps = {
  navigation: {
    navigate() {},
  },
};

export default CurrencyScreen;
