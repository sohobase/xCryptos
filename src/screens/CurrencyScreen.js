import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, RefreshControl, ScrollView, Text, View } from 'react-native';
import { C, STYLE, THEME } from '../config';
import { ButtonIcon, Chart } from '../components';
import { ServiceCurrencies } from '../services';
import { snapshotsAction } from '../actions';
import styles from './CurrencyScreen.style';

class CurrencyScreen extends Component {
  static navigationOptions({ navigation: { navigate, state } }) {
    const { currency = {} } = state.params || {};

    return {
      title: currency.name,
      headerRight: <ButtonIcon icon="alert" onPress={() => navigate('Currencies')} />,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      history: undefined,
      prefetch: false,
      refreshing: false,
    };
    this._fetch = this._fetch.bind(this);
  }

  componentWillMount() {
    this._fetch();
  }

  async _fetch() {
    const { currency, snapshots } = this.props;

    this.setState({ history: undefined, refreshing: true });
    const snapshot = await ServiceCurrencies.fetch(currency.symbol);
    const history = await ServiceCurrencies.history(currency.symbol);

    snapshots({ ...snapshot, history }, currency.symbol);
    this.setState({ history, prefetch: true, refreshing: false });
  }

  _renderChart() {
    const { snapshot: { high, history = [], low } } = this.props;

    return (
      <View style={styles.section}>
        <View style={[STYLE.ROW, styles.navigation]}>
          <Text style={[styles.time, styles.timeActive]}>1H</Text>
          <Text style={[styles.time, styles.timeMiddle]}>24H</Text>
          <Text style={styles.time}>1M</Text>
        </View>

        <Chart style={styles.chart} dataSource={history} />

        <View style={STYLE.ROW}>
          <View style={styles.left}>
            <Text style={styles.label}>low</Text>
            <Text style={[STYLE.FONT_STRONG, styles.highlight]}>${low}</Text>
          </View>
          <View>
            <Text style={[styles.label, styles.right]}>high</Text>
            <Text style={[STYLE.FONT_STRONG, styles.highlight, styles.right]}>${high}</Text>
          </View>
        </View>
      </View>
    );
  }

  _renderExchanges() {
    const { snapshot: { exchanges = [] } } = this.props;

    return (
      <View style={styles.section}>
        { exchanges.length > 0 && <Text style={[styles.title, styles.highlight]}>Exchanges</Text> }
        {
          exchanges.sort((a, b) => a.MARKET - b.MARKET).map(({ MARKET, PRICE = 0 }) => {
            return (
              <View key={`${MARKET}${PRICE}`} style={STYLE.ROW}>
                <Text style={[styles.label, styles.left]}>{MARKET}</Text>
                <Text style={styles.highlight}>${parseFloat(PRICE).toFixed(2)}</Text>
              </View>
            );
          })
        }
      </View>
    );
  }

  render() {
    const { _fetch } = this;
    const {
      currency: { image, name, symbol, usd },
      snapshot: { price },
    } = this.props;
    const { prefetch, refreshing } = this.state;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing && prefetch} onRefresh={_fetch} tintColor={THEME.WHITE} />}
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
        { this._renderChart() }
        { this._renderExchanges() }
      </ScrollView>
    );
  }
}

CurrencyScreen.propTypes = {
  currency: C.SHAPE.CURRENCY,
  // navigation: C.SHAPE.NAVIGATION,
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
