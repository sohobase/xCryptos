import { LinearGradient } from 'expo';
import { shape } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState, ScrollView, Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { C, SHAPE, STYLE, THEME } from '../../config';
import { Amount, ButtonIcon, Touchable } from '../../components';
import { ServiceCoins } from '../../services';
import { snapshotsAction } from '../../actions';
import { Chart, Exchanges, ModalHodl, Prices } from './components';
import styles from './Coin.style';

const { DEFAULT: { TIMELINE } } = C;
const { COIN, SNAPSHOT } = SHAPE;
const { GRADIENT, MOTION } = THEME;

class CoinScreen extends Component {
  static navigationOptions({ navigation: { navigate, state } }) {
    const { coin = {} } = state.params || {};

    return {
      title: coin.name,
      headerRight: <ButtonIcon icon="alert" onPress={() => navigate('Alerts', { coin })} />,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      history: undefined,
      modal: false,
      timeline: TIMELINE,
    };
    this._fetch = this._fetch.bind(this);
    this._onModal = this._onModal.bind(this);
    this._onTimeline = this._onTimeline.bind(this);
    this._onValue = this._onValue.bind(this);
  }

  componentWillMount() {
    const { _fetch } = this;
    _fetch(false);
    AppState.addEventListener('change', state => state === 'active' && _fetch());
  }

  componentWillReceiveProps() {
    this.setState({ fetching: false, history: undefined, timeline: TIMELINE });
  }

  async _fetch(reload = true) {
    const { coin: { coin }, settings: { currency }, snapshots } = this.props;

    if (reload) this.setState({ fetching: true });
    const snapshot = await ServiceCoins.fetch(coin, currency);
    const history = await ServiceCoins.history(coin, TIMELINE, currency);
    if (snapshot && history) snapshots({ ...snapshot, history }, coin);
    this.setState({ fetching: false, history });
  }

  _onModal() {
    this.setState({ modal: !this.state.modal });
  }

  async _onTimeline(timeline) {
    const { coin: { coin } } = this.props;

    this.setState({ fetching: true, timeline });
    this.setState({
      fetching: false,
      history: await ServiceCoins.history(coin, timeline),
    });
  }

  _onValue(price) {
    this.setState({ price });
  }

  render() {
    const {
      _onModal, _onTimeline, _onValue,
      props: { coin, snapshot },
      state: {
        fetching, history = snapshot.history || [], modal, price = coin.price, timeline,
      },
    } = this;
    let high = 0;
    let low = 0;
    if (!fetching && history.length > 0) {
      high = Math.max.apply(null, history.map(({ value }) => value));
      low = Math.min.apply(null, history.map(({ value }) => value));
    }

    return (
      <View style={STYLE.SCREEN}>
        <LinearGradient colors={GRADIENT} style={[STYLE.LAYOUT_MAIN, styles.container]}>
          <Motion {...MOTION.DEFAULT} delay={100}>
            <Touchable onPress={_onModal}>
              <View style={[STYLE.CHIP, STYLE.CENTERED, styles.chip]}>
                { coin.hodl > 0 && <Amount value={coin.hodl * coin.price} style={styles.hodl} /> }
                <Text style={styles.caption}>{coin.hodl > 0 ? `${coin.hodl} ${coin.coin}` : 'Set your holdings'}</Text>
              </View>
            </Touchable>
          </Motion>
          <Prices low={low} high={high} price={price} />
          <Chart dataSource={history} fetching={fetching} onTimeline={_onTimeline} timeline={timeline} onValue={_onValue} />
        </LinearGradient>
        <ScrollView style={STYLE.LAYOUT_SECONDARY}>
          <Exchanges coin={coin} dataSource={snapshot.exchanges} />
        </ScrollView>
        <ModalHodl coin={coin} onClose={_onModal} visible={modal} />
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

const mapStateToProps = ({ favorites, settings, snapshots = {} }, props) => {
  const { coin = {} } = props.navigation.state.params;
  const snapshot = snapshots[coin.coin] || {};

  return {
    coin: favorites.find((favorite) => favorite.coin === coin.coin),
    settings,
    snapshot,
  };
};

const mapDispatchToProps = dispatch => ({
  snapshots: (data, coin) => data && coin && dispatch(snapshotsAction(data, coin)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinScreen);
