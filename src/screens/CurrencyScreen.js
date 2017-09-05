import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, RefreshControl, ScrollView, Text, View } from 'react-native';
import { C, STYLE, THEME } from '../config';
import { ButtonIcon } from '../components';
import { ServiceCurrencies } from '../services';
import { snapshotsAction } from '../actions';
import styles from './CurrencyScreen.style';

class CurrencyScreen extends Component {
  static navigationOptions({ navigation }) {
    const { navigate, state } = navigation;
    const { currency = {} } = state.params || {};

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
    this._fetch = this._fetch.bind(this);
  }

  componentDidMount() {
    const { snapshot } = this.props;
    if (Object.values(snapshot).length === 0) {
      this._fetch();
    }
  }

  async _fetch() {
    const { navigation, snapshots } = this.props;
    const { currency = {} } = navigation.state.params;

    this.setState({ refreshing: true });
    const data = await ServiceCurrencies.fetch(currency.symbol);
    snapshots(data, currency.symbol);
    this.setState({ refreshing: false });
  }

  render() {
    const { _fetch } = this;
    const {
      currency: { image, name, symbol, usd },
      snapshot: { exchanges = [], high, low, price },
    } = this.props;
    const { refreshing } = this.state;

    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_fetch} tintColor={THEME.WHITE} />}
        style={[STYLE.SCREEN, styles.container]}
      >
        <View style={[styles.section, STYLE.ROW]}>
          { image && <Image style={STYLE.CURRENCY_ICON} source={{ uri: image }} /> }
          <View style={styles.currency}>
            <Text style={STYLE.CURRENCY_SYMBOL}>{symbol}</Text>
            <Text style={styles.label}>{name}</Text>
          </View>
          <Text style={[styles.highlight, styles.currentPrice]}>{`$${price || usd}`}</Text>
        </View>
        <View style={[styles.section, STYLE.ROW]}>
          <View style={styles.left}>
            <Text style={styles.label}>low</Text>
            <Text style={[STYLE.FONT_STRONG, styles.highlight]}>${low}</Text>
          </View>
          <View>
            <Text style={[styles.label, styles.right]}>high</Text>
            <Text style={[STYLE.FONT_STRONG, styles.highlight, styles.right]}>${high}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.title, styles.highlight]}>Exchanges</Text>
          {
            exchanges.sort((a, b) => a.PRICE - b.PRICE).map(({ MARKET, PRICE = 0 }) => {
              return (
                <View key={MARKET} style={STYLE.ROW}>
                  <Text style={[styles.label, styles.left]}>{MARKET}</Text>
                  <Text style={styles.highlight}>${parseFloat(PRICE).toFixed(2)}</Text>
                </View>
              );
            })
          }
        </View>
      </ScrollView>
    );
  }
}

CurrencyScreen.propTypes = {
  currency: C.SHAPE.CURRENCY,
  navigation: C.SHAPE.NAVIGATION,
  snapshot: C.SHAPE.SNAPSHOT,
};

CurrencyScreen.defaultProps = {
  currency: {},
  navigation: {
    navigate() {},
  },
  snapshot: {},
};

const mapStateToProps = ({ snapshots = {} }, props) => {
  const { currency = {} } = props.navigation.state.params;
  const snapshot = snapshots[currency.symbol] || {};

  return { currency, snapshot };
};

const mapDispatchToProps = dispatch => ({
  snapshots: (currency, symbol) => dispatch(snapshotsAction(currency, symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyScreen);
