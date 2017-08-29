import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class Currencies extends Component {
  static navigationOptions({ navigation }) {
    const { navigate } = navigation;

    return {
      title: 'Currencies',
      headerRight: <Button title="Search" />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
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

  _keyExtractor = (item) => item.rank;

  _onChangeItem = async ({ currency, favorite }) => {
    this.props.saveFavorites(await ServiceFavorites[favorite ? 'remove' : 'add'](currency));
  }

  _renderItem = ({ item }) => {
    const { favorites, navigation: { navigate } } = this.props;

    return (
      <CurrencyListItem
        currency={item}
        favorite={favorites.findIndex((i) => i.symbol === item.symbol) > -1}
        onPress={navigate.bind(null, 'Currency', { currency: item })}
        onChange={this._onChangeItem.bind(this)}
      />
    );
  }

  render() {
    const { currencies, favorites } = this.props;
    const { refreshing } = this.state;
    const { _fetch } = this;

    return (
      <View style={styles.container}>
        <FlatList
          data={currencies}
          keyExtractor={this._keyExtractor}
          extraData={this.state.favorites}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_fetch.bind(this)} /> }
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.currencies,
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({
  saveCurrencies: (currencies) => dispatch(save_currencies(currencies)),
  saveFavorites: (favorites) => dispatch(save_favorites(favorites)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
