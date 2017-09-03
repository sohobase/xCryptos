import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, func } from 'prop-types';
import { Button, FlatList, View } from 'react-native';
import { C } from '../config';
import { ServiceCurrencies } from '../services';
import { FavoriteItem, RefreshCurrencies, VirtualKeyboard } from './components';
import { init_favorites } from '../actions';
import styles from './MainScreen.style';

const keyExtractor = item => item.symbol;

class Main extends Component {
  static navigationOptions({ navigation }) {
    const { navigate } = navigation;

    return {
      drawerLabel: 'Home',
      headerLeft: <Button title="menu" onPress={() => navigate('DrawerOpen')} />,
      title: 'Cryptos',
      headerRight: <Button title="Add" onPress={() => navigate('Currencies')} />,
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

    ServiceCurrencies.prices(favorites.map(fav => fav.symbol));
  }

  async componentWillReceiveProps() {
    this.setState({
      activeCurrency: this.props.favorites.find(({ active }) => (active)),
    });
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
      <View style={styles.container}>
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
};

Main.defaultProps = {
  favorites: [],
  navigation: {
    navigate() {},
  },
  initFavorites() {},
};

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({
  initFavorites: favorites => dispatch(init_favorites(favorites)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
