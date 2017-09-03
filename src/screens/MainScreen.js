import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, func } from 'prop-types';
import { Button, FlatList, Image, View } from 'react-native';
import { initFavoritesAction, updatePricesAction } from '../actions';
import { ButtonDrawer, FavoriteItem, RefreshCurrencies, VirtualKeyboard } from './components';
import { C, STYLE, THEME } from '../config';
import { ServiceCurrencies } from '../services';
import styles from './MainScreen.style';

const keyExtractor = item => item.symbol;

class Main extends Component {
  static navigationOptions({ navigation }) {
    const { navigate } = navigation;

    return {
      drawerLabel: 'Home',
      // drawerIcon: ({ tintColor = 'red' }) => (
      //   <Image source={require('../assets/Litecoin.png')} style={{ tintColor }} />
      // ),
      headerLeft: <ButtonDrawer navigation={navigation} />,
      title: 'Cryptos',
      headerRight: <Button color={THEME.CONTRAST} title="Add" onPress={() => navigate('Currencies')} />,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      activeCurrency: undefined,
      decimal: false,
      refreshing: false,
      value: 1,
    };
    this._renderItem = this._renderItem.bind(this);
    this._onChangeValue = this._onChangeValue.bind(this);
  }

  async componentWillMount() {
    const { favorites, initFavorites } = this.props;
    if (favorites.length === 0) initFavorites(C.DEFAULT_FAVORITES);
  }

  componentWillReceiveProps({ favorites }) {
    this.setState({
      activeCurrency: favorites.find(({ active }) => (active)),
    });
  }

  async _fetchPrices() {
    const { favorites, updatePrices } = this.props;
    updatePrices(await ServiceCurrencies.prices(favorites.map(fav => fav.symbol)));
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
    const { favorites } = this.props;
    const { decimal, value } = this.state;

    return (
      <View style={STYLE.SCREEN}>
        <FlatList
          data={favorites}
          extraData={this.state}
          keyExtractor={(keyExtractor)}
          refreshControl={<RefreshCurrencies autoRefresh={false} />}
          renderItem={this._renderItem}
          style={styles.favorites}
        />
        <VirtualKeyboard decimal={decimal} onChange={this._onChangeValue} value={value} />
      </View>
    );
  }
}

Main.propTypes = {
  favorites: arrayOf(C.SHAPE.FAVORITE),
  navigation: C.SHAPE.NAVIGATION,
  initFavorites: func,
  updatePrices: func,
};

Main.defaultProps = {
  favorites: [],
  navigation: {
    navigate() {},
  },
  initFavorites() {},
  updatePrices() {},
};

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({
  initFavorites: favorites => dispatch(initFavoritesAction(favorites)),
  updatePrices: prices => dispatch(updatePricesAction(prices)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
