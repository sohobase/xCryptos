import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, func, shape, string, number } from 'prop-types';
import { Button, FlatList, View } from 'react-native';
import { C } from '../config';
import { ServiceFavorites, ServiceStorage } from '../services';
import { FavoriteItem, RefreshCurrencies, VirtualKeyboard } from './components';
import { save_favorites } from '../actions';
import styles from './MainScreen.style';

const keyExtractor = item => item.symbol;

class Main extends Component {
  static navigationOptions({ navigation }) {
    const { navigate } = navigation;

    return {
      headerLeft: <Button title="menu" onPress={() => navigate('DrawerOpen')} />,
      title: 'Cryptos',
      headerRight: <Button title="Add" onPress={() => navigate('Currencies')} />,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      activeCurrency: undefined,
      refreshing: false,
      value: 1,
    };
    this._renderItem = this._renderItem.bind(this);
    this._onChangeValue = this._onChangeValue.bind(this);
  }

  async componentWillMount() {
    // ServiceStorage.remove(C.STORAGE.FAVORITES);
    this.props.saveFavorites(await ServiceFavorites.list());
  }

  async componentWillReceiveProps() {
    this.setState({
      activeCurrency: await ServiceFavorites.active(),
    });
  }

  _onPressItem(currency) {
    this.props.navigation.navigate('Currency', { currency });
  }

  _renderItem({ item }) {
    const { navigate } = this.props.navigation;
    const { activeCurrency = {}, value } = this.state;

    return (
      <FavoriteItem
        currency={item}
        conversionUsd={activeCurrency.usd}
        onPress={() => navigate('Currency', { currency: item })}
        value={value}
      />
    );
  }

  _onChangeValue(value) {
    this.setState({ value });
  }

  render() {
    const { favorites } = this.props;
    const { value } = this.state;

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
        <VirtualKeyboard onChange={this._onChangeValue} value={value} />
      </View>
    );
  }
}

Main.propTypes = {
  favorites: arrayOf(shape({
    name: string,
    rank: number,
    symbol: string,
    usd: number,
  })),
  navigation: shape({
    navigate: func,
  }),
  saveFavorites: func,
};

Main.defaultProps = {
  favorites: [],
  navigation: {
    navigate() {},
  },
  saveFavorites() {},
};

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({
  saveFavorites: favorites => dispatch(save_favorites(favorites)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
