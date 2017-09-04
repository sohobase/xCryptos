import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Text, View } from 'react-native';
import { C, STYLE } from '../config';
import { ButtonIcon } from '../components';
import { ServiceCurrencies } from '../services';
import { snapshotsAction } from '../actions';
import styles from './CurrencyScreen.style';

class CurrencyScreen extends Component {
  static navigationOptions({ navigation }) {
    const { navigate, state } = navigation;
    const { currency = {} } = state.params;

    return {
      title: currency.name,
      headerRight: <ButtonIcon icon="alert" onPress={() => navigate('Currencies')} />,
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
    const { navigation, snapshots } = this.props;
    const { currency } = navigation.state.params;
    const data = await ServiceCurrencies.fetch(currency.symbol);
    snapshots(data, currency.symbol);
  }

  render() {
    const { navigation, snapshot = {} } = this.props;
    const { image, name, symbol } = navigation.state.params.currency;

    return (
      <View style={[STYLE.SCREEN, styles.container]}>
        <View style={styles.header}>
          { image && <Image style={STYLE.CURRENCY_ICON} source={{ uri: image }} /> }
          <View style={styles.currency}>
            <Text style={STYLE.CURRENCY_SYMBOL}>{symbol}</Text>
            <Text style={styles.text}>{name}</Text>
          </View>
          <Text style={styles.price}>{`$${snapshot.price}`}</Text>
        </View>
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
