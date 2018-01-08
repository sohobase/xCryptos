import { arrayOf, func, string, shape } from 'prop-types';
import { LinearGradient, Notifications } from 'expo';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState, FlatList, RefreshControl, View } from 'react-native';
import { addTokenAction, saveAlertsAction, updatePricesAction } from '../../actions';
import { ButtonIcon } from '../../components';
import { C, SHAPE, STYLE, THEME } from '../../config';
import { ServiceAlerts, ServiceCoins, ServiceNotifications } from '../../services';
import { Hodl, ListItem, VirtualKeyboard } from './components';
import styles from './Main.style';

const { DEFAULT: { FAVORITES, TOKEN }, NODE_ENV: { DEVELOPMENT } } = C;
const { FAVORITE, NAVIGATION, SETTINGS } = SHAPE;

class Main extends Component {
  static navigationOptions({ navigation: { navigate } }) {
    return {
      headerLeft: <Hodl />,
      headerRight: <ButtonIcon icon="settings" onPress={() => navigate('Settings')} style={styles.icon} />,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      activeCoin: undefined,
      keyboard: true,
      decimal: false,
      prefetch: false,
      refreshing: false,
      value: '1',
    };
    this._renderItem = this._renderItem.bind(this);
    this._onChangeValue = this._onChangeValue.bind(this);
    this._fetch = this._fetch.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this._onNotification = this._onNotification.bind(this);
  }

  async componentWillMount() {
    const { _fetch, _onNotification, props: { addToken, token } } = this;
    const { env: { NODE_ENV } } = process;

    _fetch();
    if (!token) addToken(NODE_ENV === DEVELOPMENT ? TOKEN : await ServiceNotifications.getToken());
    Notifications.addListener(_onNotification);
    AppState.addEventListener('change', state => state === 'active' && _fetch());
  }

  componentWillReceiveProps({ favorites = [] }) {
    this.setState({
      activeCoin: favorites.find(({ active }) => active),
    });
  }

  async _fetch() {
    const {
      favorites, settings: { currency }, saveAlerts, updatePrices, token,
    } = this.props;

    this.setState({ refreshing: true });
    ServiceCoins.prices(favorites.map(({ coin }) => coin), currency).then(updatePrices);
    ServiceAlerts.get(token).then(saveAlerts);
    this.setState({ prefetch: true, refreshing: false });
  }

  _onChangeValue({ value, decimal }) {
    this.setState({ value, decimal });
  }

  _onNotification = ({ data: { coin } }) => {
    const { props: { favorites = [], navigation } } = this;
    const storeCoin = favorites.find(item => item.coin === coin);
    if (storeCoin) navigation.navigate('Coin', { coin: storeCoin });
  };

  _onScroll() {
    this.setState({ keyboard: false });
  }

  _renderItem({ item: coin }) {
    const {
      props: { navigation: { navigate } },
      state: {
        activeCoin: { price } = {}, decimal, value,
      },
    } = this;

    return (
      <ListItem
        coin={coin}
        decimal={decimal}
        conversion={price}
        onFocus={() => this.setState({ keyboard: true })}
        onPress={() => navigate('Coin', { coin })}
        value={value}
      />
    );
  }

  render() {
    const {
      _fetch, _onChangeValue, _onScroll, _renderItem,
      props: { favorites = [] },
      state: {
        decimal, keyboard, prefetch, refreshing, value,
      },
    } = this;

    return (
      <View style={STYLE.SCREEN}>
        <LinearGradient colors={THEME.GRADIENT} style={keyboard && STYLE.LAYOUT_MAIN}>
          <FlatList
            data={favorites}
            extraData={this.state}
            keyExtractor={item => item.coin}
            onScroll={_onScroll}
            refreshControl={
              <RefreshControl refreshing={refreshing && prefetch} onRefresh={_fetch} tintColor={THEME.WHITE} />}
            renderItem={_renderItem}
          />
        </LinearGradient>
        { <VirtualKeyboard active={keyboard} decimal={decimal} onChange={_onChangeValue} value={value} /> }
      </View>
    );
  }
}

Main.propTypes = {
  addToken: func,
  favorites: arrayOf(shape(FAVORITE)),
  navigation: shape(NAVIGATION).isRequired,
  settings: shape(SETTINGS),
  token: string,
  updatePrices: func,
};

Main.defaultProps = {
  addToken() {},
  favorites: FAVORITES,
  settings: C.DEFAULT.SETTINGS,
  token: undefined,
  updatePrices() {},
};

const mapStateToProps = ({ favorites, settings, token }) => ({
  favorites: favorites.sort((a, b) => {
    if (a.total === 0 && b.total === 0) return a.rank > b.rank ? 0 : -1;
    return a.total < b.total ? 0 : -1;
  }),
  settings,
  token,
});

const mapDispatchToProps = dispatch => ({
  addToken: token => dispatch(addTokenAction(token)),
  saveAlerts: alerts => alerts && dispatch(saveAlertsAction(alerts)),
  updatePrices: prices => prices && dispatch(updatePricesAction(prices)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
