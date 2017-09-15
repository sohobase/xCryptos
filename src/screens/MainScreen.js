import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, func } from 'prop-types';
import { FlatList, Image, RefreshControl, View } from 'react-native';
import { updatePricesAction } from '../actions';
import { ButtonIcon, FavoriteItem, VirtualKeyboard } from '../components';
import { C, STYLE, THEME } from '../config';
import { ServiceCurrencies } from '../services';
import styles from './MainScreen.style';
import PKG from '../../package.json';

const keyExtractor = item => item.symbol;

class Main extends Component {
  static navigationOptions({ navigation: { navigate } }) {
    return {
      drawerLabel: 'Favorites',
      drawerIcon: ({ tintColor }) => <Image source={C.ICON.home} style={[STYLE.DRAWER_ICON, { tintColor }]} />,
      headerLeft: <ButtonIcon icon="menu" onPress={() => navigate('DrawerOpen')} />,
      title: PKG.name,
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
      value: 1,
    };
    this._renderItem = this._renderItem.bind(this);
    this._onChangeValue = this._onChangeValue.bind(this);
    this._fetch = this._fetch.bind(this);
  }

  componentWillMount() {
    this._fetch();
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

  _onChangeValue({ value, decimal }) {
    this.setState({ value, decimal });
  }

  _onPressItem(currency) {
    this.props.navigation.navigate('Currency', { currency });
  }

  _renderItem({ item }) {
    const { navigate } = this.props.navigation;
    const { activeCurrency = {}, decimal, value } = this.state;

    return (
      <FavoriteItem
        currency={item}
        decimal={decimal}
        conversionUsd={activeCurrency.usd}
        onPress={() => navigate('Currency', { currency: item })}
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
  favorites: arrayOf(C.SHAPE.FAVORITE),
  navigation: C.SHAPE.NAVIGATION,
  updatePrices: func,
};

Main.defaultProps = {
  favorites: C.DEFAULT_FAVORITES,
  navigation: {
    navigate() {},
  },
  updatePrices() {},
};

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({
  updatePrices: prices => dispatch(updatePricesAction(prices)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
