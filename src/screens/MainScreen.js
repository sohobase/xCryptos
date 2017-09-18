import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, func, string } from 'prop-types';
import { FlatList, Image, RefreshControl, View } from 'react-native';
import { Notifications } from 'expo';
import { addTokenAction, saveAlertsAction, updatePricesAction } from '../actions';
import { ButtonIcon, FavoriteItem, Logo, VirtualKeyboard } from '../components';
import { C, STYLE, THEME } from '../config';
import { ServiceAlerts, ServiceCurrencies, ServiceNotifications } from '../services';
import styles from './MainScreen.style';

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
    this._fetchAlerts = this._fetchAlerts.bind(this);
    this._handleNotification = this._handleNotification.bind(this);
  }

  async componentWillMount() {
    const { addToken, token } = this.props;
    this._fetch();

    if (!token) {
      addToken(await ServiceNotifications());
    } else {
      this._fetchAlerts();
      Notifications.addListener(this._handleNotification);
    }
  }

  // componentDidMount() {
  //   this.props.navigation.navigate('Currency', { currency: this.props.favorites[1] });
  //   this.props.navigation.navigate('DrawerOpen');
  // }

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

  async _fetchAlerts() {
    const { saveAlerts, token } = this.props;
    saveAlerts(await ServiceAlerts.get(token));
  }

  _onChangeValue({ value, decimal }) {
    this.setState({ value, decimal });
  }

  _onPressItem(currency) {
    this.props.navigation.navigate('Currency', { currency });
  }

  _handleNotification = (notification) => {
    const { favorites } = this.props;
    const currency = notification.data.currency;
    const currencyFind = favorites.find(i => i.symbol === currency);
    if (currencyFind) this.props.navigation.navigate('Currency', { currency: currencyFind });
  };

  _renderItem({ item }) {
    const { navigation: { navigate }, token } = this.props;
    const { activeCurrency = {}, decimal, value } = this.state;

    return (
      <FavoriteItem
        currency={item}
        decimal={decimal}
        conversionUsd={activeCurrency.usd}
        onPress={() => navigate('Currency', { currency: { ...item, token } })}
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
