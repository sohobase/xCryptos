import React, { Component } from 'react';
import { Button, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { CurrencyListItem } from './components';
import { C } from '../config';
import { ServiceCryptos, ServiceFavorites, ServiceStorage } from '../services';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Currencies extends Component {

  static navigationOptions = {
    title: 'Currencies',
    headerRight: <Button title="Search" />,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      favorites: [],
      refreshing: false,
    };
  }

  async componentWillMount() {
    try {
      this.setState({
        dataSource: await ServiceStorage.get(C.STORAGE.CRYPTOS),
        favorites: await ServiceFavorites.keys(),
      });
    } catch (e) {
      console.error('error', e);
    }
  }

  async _fetch() {
    this.setState({ refreshing: true });
    dataSource = await ServiceCryptos.list();
    this.setState({ dataSource, refreshing: false });
  }

  _keyExtractor = (item) => item.rank;

  _onChangeItem = async ({ currency, favorite }) => {
    console.log('🤔🤔🤔🤔🤔', currency.symbol, favorite)
    this.setState({
      favorites: await ServiceFavorites[favorite ? 'remove' : 'add'](currency.symbol)
    });
  }

  _renderItem = ({ item }) => {
    const { favorites } = this.state;
    const { navigate } = this.props.navigation;


    return (
      <CurrencyListItem
        currency={item}
        favorite={favorites.indexOf(item.symbol) > -1}
        onPress={navigate.bind(null, 'Currency', { currency: item })}
        onChange={this._onChangeItem.bind(this)}
      />
    );
  }

  render() {
    const { dataSource, favorites, refreshing } = this.state;
    const { _fetch } = this;

    console.log('RENDER/FAVORITES', favorites);

    return (
      <View style={styles.container}>
        <FlatList
          data={dataSource}
          keyExtractor={this._keyExtractor}
          extraData={this.state.favorites}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_fetch.bind(this)} /> }
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default Currencies;
