import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Text, View } from 'react-native';
import { C } from '../config';
import { ServiceCurrencies } from '../services';
import { snapshotsAction } from '../actions';
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
    const { snapshots } = this.props;
    const { currency } = this.props.navigation.state.params;
    const data = await ServiceCurrencies.fetch(currency.symbol);
    snapshots(data, currency.symbol);
  }

  render() {
    const { snapshot = {} } = this.props;

    return (
      <View style={styles.container}>
        { Object.keys(snapshot).map(key => <Text key={key}>{`${key}:${snapshot[key]}`}</Text>) }
      </View>
    );
  }
}

CurrencyScreen.propTypes = {
  navigation: C.SHAPE.NAVIGATION,
  snapshot: C.SHAPE.SNAPSHOT,
};

CurrencyScreen.defaultProps = {
  navigation: {
    navigate() {},
  },
  snapshot: {},
};


const mapStateToProps = ({ snapshots = {} }, props) => {
  const { currency } = props.navigation.state.params;

  return {
    snapshot: snapshots[currency.symbol],
  };
};

const mapDispatchToProps = dispatch => ({
  snapshots: (currency, symbol) => dispatch(snapshotsAction(currency, symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyScreen);
