import { shape } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState, ScrollView, View } from 'react-native';
import { C, SHAPE, STYLE } from '../../config';
import { ButtonIcon } from '../../components';
import { ServiceCoins } from '../../services';
import { snapshotsAction } from '../../actions';
import { CoinInfo, ExchangeListItem } from './components';


const { DEFAULT: { TIMELINE } } = C;
const { COIN, SNAPSHOT } = SHAPE;

class CoinScreen extends Component {
  static navigationOptions({ navigation: { navigate, state } }) {
    const { coin = {}, token } = state.params || {};

    return {
      title: coin.name,
      headerRight: token && <ButtonIcon icon="alert" onPress={() => navigate('Alerts', { coin })} />,
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
    const { coin: { coin }, settings: { currency }, snapshots } = this.props;

    this.setState({ history: undefined, refreshing: true, timeline: TIMELINE });
    const snapshot = await ServiceCoins.fetch(coin, currency);
    const history = await ServiceCoins.history(coin, TIMELINE, currency);
    if (snapshot && history) snapshots({ ...snapshot, history }, coin);
    this.setState({ refreshing: false });
  }

  async _onPressTimeline(timeline) {
    const { coin: { coin } } = this.props;

    this.setState({ history: [], timeline });
    const history = await ServiceCoins.history(coin, timeline);
    this.setState({ history });
  }

  render() {
    const {
      _onPressTimeline,
      props: { coin, snapshot },
      state: { refreshing, timeline, history = snapshot.history || [] },
    } = this;
    const { exchanges = [] } = snapshot;

    const props = {
      coin, history, onChange: _onPressTimeline, refreshing, timeline,
    };

    return (
      <View style={STYLE.SCREEN}>
        <CoinInfo {...props} />
        <ScrollView style={STYLE.LAYOUT_SECONDARY}>
          {
            exchanges.map(item => (
              <ExchangeListItem key={`${item.MARKET}${item.PRICE}`} coin={coin} exchange={item} />
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

CoinScreen.propTypes = {
  coin: shape(COIN),
  snapshot: shape(SNAPSHOT),
};

CoinScreen.defaultProps = {
  coin: {},
  snapshot: {},
};

const mapStateToProps = ({ settings, snapshots = {}, token }, props) => {
  const { coin = {} } = props.navigation.state.params;
  const snapshot = snapshots[coin.coin] || {};

  return {
    coin, settings, snapshot, token,
  };
};

const mapDispatchToProps = dispatch => ({
  snapshots: (data, coin) => data && coin && dispatch(snapshotsAction(data, coin)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinScreen);