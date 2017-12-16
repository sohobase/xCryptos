import { arrayOf, func, string, shape } from 'prop-types';
import { LinearGradient, Notifications } from 'expo';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState, FlatList, RefreshControl, View } from 'react-native';
import { addTokenAction, updatePricesAction } from '../../actions';
import { ButtonIcon } from '../../components';
import { C, SHAPE, STYLE, THEME } from '../../config';
import { ServiceCurrencies, ServiceNotifications } from '../../services';
import { Hodl, ListItem, VirtualKeyboard } from './components';
import styles from './Main.style';

const { DEFAULT: { FAVORITES, TOKEN }, NODE_ENV: { DEVELOPMENT } } = C;
const { FAVORITE, NAVIGATION, SETTINGS } = SHAPE;
const keyExtractor = item => item.symbol;

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
      activeCurrency: undefined,
      decimal: false,
      prefetch: false,
      refreshing: false,
      value: '1',
    };
    this._renderItem = this._renderItem.bind(this);
    this._onChangeValue = this._onChangeValue.bind(this);
    this._fetch = this._fetch.bind(this);
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
      activeCurrency: favorites.find(({ active }) => (active)),
    });
  }

  async _fetch() {
    const { favorites, settings: { currency }, updatePrices } = this.props;

    this.setState({ refreshing: true });
    ServiceCurrencies.prices(favorites.map(({ symbol }) => symbol), currency).then(updatePrices);
    this.setState({ prefetch: true, refreshing: false });
  }

  _onChangeValue({ value, decimal }) {
    this.setState({ value, decimal });
  }

  _onPressItem(currency) {
    this.props.navigation.navigate('Currency', { currency });
  }

  _onNotification = ({ data: { currency } }) => {
    const { _onPressItem, props: { favorites = [] } } = this;
    const currencyFind = favorites.find(item => item.symbol === currency);

    if (currencyFind) _onPressItem(currencyFind);
  };

  _renderItem({ item: currency }) {
    const {
      props: { navigation: { navigate }, token },
      state: { activeCurrency = {}, decimal, value },
    } = this;

    return (
      <ListItem
        currency={currency}
        decimal={decimal}
        conversionUsd={activeCurrency.usd}
        onAlert={() => navigate('Alerts', { currency })}
        onPress={() => navigate('Currency', { currency, token })}
        value={value}
      />
    );
  }

  render() {
    const {
      _fetch, _onChangeValue, _renderItem,
      props: { favorites },
      state: {
        decimal, prefetch, refreshing, value,
      },
    } = this;

    return (
      <View style={STYLE.SCREEN}>
        <LinearGradient colors={[THEME.PRIMARY, THEME.PRIMARY, THEME.ACCENT]} style={STYLE.LAYOUT_MAIN}>
          <FlatList
            data={favorites}
            extraData={this.state}
            keyExtractor={(keyExtractor)}
            refreshControl={
              <RefreshControl refreshing={refreshing && prefetch} onRefresh={_fetch} tintColor={THEME.WHITE} />}
            renderItem={_renderItem}
          />
        </LinearGradient>
        <VirtualKeyboard decimal={decimal} onChange={_onChangeValue} value={value} />
      </View>
    );
  }
}

Main.propTypes = {
  addToken: func,
  favorites: arrayOf(shape(FAVORITE)),
  navigation: shape(NAVIGATION),
  settings: shape(SETTINGS),
  token: string,
  updatePrices: func,
};

Main.defaultProps = {
  addToken() {},
  favorites: FAVORITES,
  navigation: {
    navigate() {},
  },
  settings: C.DEFAULT.SETTINGS,
  token: undefined,
  updatePrices() {},
};

const mapStateToProps = ({ favorites, settings, token }) => ({
  favorites,
  settings,
  token,
});

const mapDispatchToProps = dispatch => ({
  addToken: token => dispatch(addTokenAction(token)),
  updatePrices: prices => prices && dispatch(updatePricesAction(prices)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
