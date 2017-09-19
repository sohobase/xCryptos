import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, func, string } from 'prop-types';
import { AppState, FlatList, Image, RefreshControl, View } from 'react-native';
import { Notifications } from 'expo';
import { addTokenAction, saveAlertsAction, updatePricesAction } from '../actions';
import { ButtonIcon, FavoriteItem, Logo, VirtualKeyboard } from '../components';
import { C, STYLE, THEME } from '../config';
import { ServiceCurrencies, ServiceNotifications } from '../services';
import styles from './MainScreen.style';

const { DEFAULT_TOKEN, NODE_ENV: { DEVELOPMENT } } = C;
const keyExtractor = item => item.symbol;

class Main extends Component {
  static navigationOptions({ navigation: { navigate } }) {
    return {
      drawerLabel: 'Favorites',
      drawerIcon: ({ tintColor }) => <Image source={C.ICON.home} style={[STYLE.DRAWER_ICON, { tintColor }]} />,
      headerLeft: <ButtonIcon icon="menu" onPress={() => navigate('DrawerOpen')} />,
      title: <Logo style={styles.logo} />,
      headerRight: <ButtonIcon icon="add" onPress={() => navigate('Currencies')} />,
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
    if (!token) addToken(NODE_ENV === DEVELOPMENT ? DEFAULT_TOKEN : await ServiceNotifications.getToken());
    Notifications.addListener(_onNotification);
    AppState.addEventListener('change', state => state === 'active' && _fetch());
  }

  componentWillReceiveProps({ favorites = [] }) {
    this.setState({
      activeCurrency: favorites.find(({ active }) => (active)),
    });
  }

  async _fetch() {
    const { favorites, updatePrices } = this.props;

    this.setState({ refreshing: true });
    updatePrices(await ServiceCurrencies.prices(favorites.map(fav => fav.symbol)));
    this.setState({ prefetch: true, refreshing: false });
  }

  _onChangeValue({ value, decimal }) {
    this.setState({ value, decimal });
  }

  _onPressItem(currency) {
    this.props.navigation.navigate('Currency', { currency });
  }

  _onNotification = ({ data: { currency } }) => {
    const { _onPressItem } = this;
    const { favorites } = this.props;
    const currencyFind = favorites.find(item => item.symbol === currency);

    if (currencyFind) _onPressItem(currencyFind);
  };

  _renderItem({ item }) {
    const { navigation: { navigate }, token } = this.props;
    const { activeCurrency = {}, decimal, value } = this.state;

    return (
      <FavoriteItem
        currency={item}
        decimal={decimal}
        conversionUsd={activeCurrency.usd}
        onPress={() => navigate('Currency', { currency: { ...item }, token })}
        value={value}
      />
    );
  }

  render() {
    const { _fetch } = this;
    const { favorites } = this.props;
    const { decimal, prefetch, refreshing, value } = this.state;

    return (
      <View style={STYLE.SCREEN}>
        <FlatList
          data={favorites}
          extraData={this.state}
          keyExtractor={(keyExtractor)}
          refreshControl={
            <RefreshControl refreshing={refreshing && prefetch} onRefresh={_fetch} tintColor={THEME.WHITE} />}
          renderItem={this._renderItem}
          style={[STYLE.LAYOUT_MAIN]}
        />
        <VirtualKeyboard decimal={decimal} onChange={this._onChangeValue} value={value} />
      </View>
    );
  }
}

Main.propTypes = {
  addToken: func,
  favorites: arrayOf(C.SHAPE.FAVORITE),
  navigation: C.SHAPE.NAVIGATION,
  token: string,
  updatePrices: func,
};

Main.defaultProps = {
  addToken() {},
  favorites: C.DEFAULT_FAVORITES,
  navigation: {
    navigate() {},
  },
  token: undefined,
  updatePrices() {},
};

const mapStateToProps = state => ({
  favorites: state.favorites,
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  addToken: token => dispatch(addTokenAction(token)),
  updatePrices: prices => dispatch(updatePricesAction(prices)),
  saveAlerts: alerts => dispatch(saveAlertsAction(alerts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
