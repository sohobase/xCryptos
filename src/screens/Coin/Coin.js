import { shape } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState, ScrollView, View } from 'react-native';
import { C, SHAPE, STYLE } from '../../config';
import { ButtonIcon } from '../../components';
import { ServiceCurrencies } from '../../services';
import { snapshotsAction } from '../../actions';
import { CurrencyContent, ExchangeListItem } from './components';


const { DEFAULT: { TIMELINE } } = C;
const { CURRENCY, SNAPSHOT } = SHAPE;

class CoinScreen extends Component {
  static navigationOptions({ navigation: { navigate, state } }) {
    const { currency = {}, token } = state.params || {};

    return {
      title: currency.name,
      headerRight: token && <ButtonIcon icon="alert" onPress={() => navigate('Alerts', { currency })} />,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      history: undefined,
      refreshing: false,
      timeline: TIMELINE,
    };
    this._fetch = this._fetch.bind(this);
    this._onPressTimeline = this._onPressTimeline.bind(this);
  }

  componentWillMount() {
    const { _fetch } = this;

    _fetch();
    AppState.addEventListener('change', state => state === 'active' && _fetch());
  }

  componentWillReceiveProps() {
    this.setState({ history: undefined, timeline: TIMELINE });
  }

  async _fetch() {
    const { currency, settings, snapshots } = this.props;

    this.setState({ history: undefined, refreshing: true, timeline: TIMELINE });
    const snapshot = await ServiceCurrencies.fetch(currency.symbol, settings.currency);
    const history = await ServiceCurrencies.history(currency.symbol, TIMELINE, settings.currency);
    if (snapshot && history) snapshots({ ...snapshot, history }, currency.symbol);
    this.setState({ refreshing: false });
  }

  async _onPressTimeline(timeline) {
    const { currency: { symbol } } = this.props;

    this.setState({ history: [], timeline });
    const history = await ServiceCurrencies.history(symbol, timeline);
    this.setState({ history });
  }

  render() {
    const { _onPressTimeline } = this;
    const { currency, snapshot } = this.props;
    const { refreshing, timeline, history = snapshot.history || [] } = this.state;
    const { exchanges = [] } = snapshot;
    const contentProps = {
      currency, history, onChange: _onPressTimeline, refreshing, timeline,
    };

    return (
      <View style={STYLE.SCREEN}>
        <CurrencyContent {...contentProps} />
        <ScrollView style={STYLE.LAYOUT_SECONDARY}>
          {
            exchanges.map(item => (
              <ExchangeListItem key={`${item.MARKET}${item.PRICE}`} currency={currency} exchange={item} />
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

CoinScreen.propTypes = {
  currency: shape(CURRENCY),
  snapshot: shape(SNAPSHOT),
};

CoinScreen.defaultProps = {
  currency: {},
  snapshot: {},
};

const mapStateToProps = ({ settings, snapshots = {}, token }, props) => {
  const { currency = {} } = props.navigation.state.params;
  const snapshot = snapshots[currency.symbol] || {};

  return {
    currency, settings, snapshot, token,
  };
};

const mapDispatchToProps = dispatch => ({
  snapshots: (currency, symbol) => currency && symbol && dispatch(snapshotsAction(currency, symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinScreen);
