import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, shape, string, number } from 'prop-types';
import { Button, FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import { CurrencyListItem } from './components';
import { C } from '../config';
import { ServiceCryptos, ServiceFavorites, ServiceStorage } from '../services';
import { save_currencies, save_favorites } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


function keyExtractor(item) {
  return item.rank;
}

class Currencies extends Component {
  static navigationOptions = {
    title: 'Currencies',
    headerRight: <Button title="Search" />,
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
    this._fetch = this._fetch.bind(this);
    this._onChangeItem = this._onChangeItem.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }

  async componentWillMount() {
    try {
      this.props.saveCurrencies(await ServiceStorage.get(C.STORAGE.CRYPTOS));
      this.props.saveFavorites(await ServiceFavorites.list());
    } catch (e) {
      console.error('error', e);
    }
  }

  async _fetch() {
    this.setState({ refreshing: true });
    this.props.saveCurrencies(await ServiceCryptos.list());
    this.setState({ refreshing: false });
  }

  async _onChangeItem({ currency, favorite }) {
    console.log(currency, favorite);
    console.log(await ServiceFavorites[favorite ? 'remove' : 'add'](currency));
    this.props.saveFavorites(await ServiceFavorites[favorite ? 'remove' : 'add'](currency));
  }

  _renderItem({ item }) {
    const { favorites, navigation: { navigate } } = this.props;

    return (
      <CurrencyListItem
        currency={item}
        favorite={favorites.findIndex(i => i.symbol === item.symbol) > -1}
        onPress={() => navigate('Currency', { currency: item })}
        onChange={this._onChangeItem}
      />
    );
  }

  render() {
    const { currencies, favorites } = this.props;
    const { refreshing } = this.state;
    const { _fetch, _renderItem } = this;

    return (
      <View style={styles.container}>
        <FlatList
          data={currencies}
          keyExtractor={keyExtractor}
          extraData={favorites}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_fetch} />}
          renderItem={_renderItem}
        />
      </View>
    );
  }
}

Currencies.propTypes = {
  currencies: shape({
    name: string,
    rank: number,
    symbol: string,
    usd: number,
  }),
  favorites: shape({
    name: string,
    rank: number,
    symbol: string,
    usd: number,
  }),
  navigation: shape({
    navigate: func,
  }),
  saveCurrencies: func,
  saveFavorites: func,
};

Currencies.defaultProps = {
  currencies: [],
  favorites: [],
  navigation: {
    navigate() {},
  },
  saveCurrencies() {},
  saveFavorites() {},
};

const mapStateToProps = state => ({
  currencies: state.currencies,
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({
  saveCurrencies: currencies => dispatch(save_currencies(currencies)),
  saveFavorites: favorites => dispatch(save_favorites(favorites)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
