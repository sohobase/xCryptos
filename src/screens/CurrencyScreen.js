import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, RefreshControl, ScrollView, Text, View } from 'react-native';
import { C, STYLE, THEME } from '../config';
import { ButtonIcon, ChartCurrency } from '../components';
import { ServiceCurrencies } from '../services';
import { snapshotsAction } from '../actions';
import styles from './CurrencyScreen.style';

const DEFAULT_TIMELINE = C.TIMELINES[0];

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
      timeline: DEFAULT_TIMELINE,
    };
    this._fetch = this._fetch.bind(this);
    this._onPressTimeline = this._onPressTimeline.bind(this);
  }

  componentWillMount() {
    this._fetch();
  }

  componentWillReceiveProps() {
    this.setState({ history: undefined, timeline: DEFAULT_TIMELINE });
  }

  async _fetch() {
    const { currency, snapshots } = this.props;

    this.setState({ history: undefined, refreshing: true, timeline: DEFAULT_TIMELINE });
    const snapshot = await ServiceCurrencies.fetch(currency.symbol);
    const history = await ServiceCurrencies.history(currency.symbol);

    snapshots({ ...snapshot, history }, currency.symbol);
    this.setState({ prefetch: true, refreshing: false });
  }

  async _onPressTimeline(timeline) {
    const { currency: { symbol } } = this.props;

    this.setState({ history: [], timeline });
    const history = await ServiceCurrencies.history(symbol, timeline);
    this.setState({ history });
  }

  _renderExchanges() {
    const { snapshot: { exchanges = [] } } = this.props;

    return (
      <View style={styles.section}>
        { exchanges.length > 0 && <Text style={[styles.title, styles.highlight]}>Exchanges</Text> }
        {
          exchanges.sort((a, b) => a.PRICE - b.PRICE).map(({ MARKET, PRICE = 0 }) => {
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
    const { _fetch, _onPressTimeline } = this;
    const {
      currency: { image, name, symbol, usd },
      snapshot: { price, history },
    } = this.props;
    const { prefetch, refreshing, timeline } = this.state;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing && prefetch} onRefresh={_fetch} tintColor={THEME.WHITE} />}
        style={[STYLE.SCREEN, styles.container]}
      >
        <View style={[styles.section, STYLE.ROW]}>
          { image && <Image style={STYLE.CURRENCY_ICON} source={{ uri: image }} /> }
          <View style={styles.left}>
            <Text style={STYLE.CURRENCY_SYMBOL}>{symbol}</Text>
            <Text style={styles.label}>{name}</Text>
          </View>
          <Text style={[styles.highlight, styles.currentPrice]}>{`$${price || usd}`}</Text>
        </View>
        <ChartCurrency
          dataSource={this.state.history || history}
          onChange={_onPressTimeline}
          style={styles.section}
          timeline={timeline}
        />
        { this._renderExchanges() }
      </ScrollView>
    );
  }
}

CurrencyScreen.propTypes = {
  currency: C.SHAPE.CURRENCY,
  snapshot: C.SHAPE.SNAPSHOT,
};

CurrencyScreen.defaultProps = {
  currency: {},
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
