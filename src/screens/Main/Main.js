import { LinearGradient, Notifications } from 'expo';
import { arrayOf, func, string, shape } from 'prop-types';
import React, { Component } from 'react';
import { AppState, BackHandler, FlatList, RefreshControl, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { addTokenAction, saveAlertsAction, updatePricesAction, updateSettingsAction } from '../../actions';
import { ButtonIcon } from '../../components';
import { C, SHAPE, STYLE, THEME } from '../../config';
import { ServiceAlerts, ServiceCoins, ServiceNotifications } from '../../services';
import { Hodl, Info, Keyboard, ListItem } from './components';
import styles from './Main.style';

const { DEFAULT: { FAVORITES, TOKEN }, LOCALE, NODE_ENV: { DEVELOPMENT } } = C;
const { COLOR: { BLACK }, PRIMARY } = THEME;

class Main extends Component {
  static navigationOptions = ({
    navigation: { navigate, state: { params: { backgroundColor = PRIMARY } = {} } },
  }) => ({
    headerLeft: <Hodl />,
    headerRight: <ButtonIcon icon="settings" onPress={() => navigate('Settings')} style={styles.icon} />,
    headerStyle: {
      backgroundColor,
      elevation: 0,
      shadowColor: 'transparent',
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
  })

  constructor(props) {
    super(props);
    this.state = {
      coin: undefined,
      keyboard: false,
      decimal: false,
      prefetch: false,
      refreshing: false,
      value: undefined,
    };
    this._onChangeValue = this._onChangeValue.bind(this);
    this._fetch = this._fetch.bind(this);
    this._onNotification = this._onNotification.bind(this);
  }

  async componentWillMount() {
    const {
      _fetch, _onNotification,
      props: {
        addToken, navigation, token, settings: { nightMode }, updateSettings,
      },
    } = this;
    const { env: { NODE_ENV } } = process;

    _fetch();
    navigation.setParams({ backgroundColor: nightMode ? BLACK : PRIMARY });
    if (!token) addToken(NODE_ENV === DEVELOPMENT ? TOKEN : await ServiceNotifications.getToken());
    updateSettings({ locale: LOCALE });

    Notifications.addListener(_onNotification);
    AppState.addEventListener('change', state => state === 'active' && _fetch());
    BackHandler.addEventListener('hardwareBackPress', () => {
      const keepAlive = this.state.coin !== undefined;
      if (keepAlive) this.setState({ coin: undefined });
      return keepAlive;
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

  render() {
    const {
      _fetch, _onChangeValue,
      props: { favorites = [], navigation, settings: { nightMode } },
      state: {
        coin: { coin: currentCoin, price } = {}, decimal, keyboard, prefetch, refreshing, value,
      },
    } = this;
    let gradient = currentCoin ? THEME.GRADIENT : THEME.GRADIENT_LIST;
    if (nightMode) gradient = [THEME.COLOR.BLACK, THEME.COLOR.BLACK];

    return (
      <LinearGradient colors={gradient} style={STYLE.SCREEN}>
        <StatusBar animated backgroundColor={nightMode ? THEME.COLOR.BLACK : THEME.COLOR.PRIMARY} />
        <FlatList
          data={favorites}
          extraData={this.state}
          keyExtractor={item => item.coin}
          refreshControl={
            <RefreshControl refreshing={refreshing && prefetch} onRefresh={_fetch} tintColor={THEME.WHITE} />}
          renderItem={({ item }) => (
            <ListItem
              active={currentCoin === item.coin}
              coin={item}
              decimal={decimal}
              conversion={price}
              onFocus={newValue => this.setState({ coin: item, keyboard: true, value: newValue })}
              onPress={() => this.setState({ coin: item, keyboard: false, value: undefined })}
              value={value}
            />
          )}
          style={styles.list}
        />
        { currentCoin && <Info coin={currentCoin} navigation={navigation} /> }
        { currentCoin &&
          <Keyboard
            visible={keyboard}
            decimal={decimal}
            onChange={_onChangeValue}
            onClose={() => this.setState({ keyboard: false, value: undefined })}
            value={value}
          /> }
      </LinearGradient>
    );
  }
}

Main.propTypes = {
  addToken: func,
  favorites: arrayOf(shape(SHAPE.FAVORITE)),
  navigation: shape(SHAPE.NAVIGATION).isRequired,
  settings: shape(SHAPE.SETTINGS),
  token: string,
  updatePrices: func,
  updateSettings: func,
};

Main.defaultProps = {
  addToken() {},
  favorites: FAVORITES,
  settings: C.DEFAULT.SETTINGS,
  token: undefined,
  updatePrices() {},
  updateSettings() {},
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
  updateSettings: settings => dispatch(updateSettingsAction(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
