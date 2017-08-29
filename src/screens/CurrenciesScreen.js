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

  _renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;

    return (
      <CurrencyListItem
        currency={item}
        favorite={this.state.favorites.indexOf(item.symbol) > -1}
        onPress={navigate.bind(null, 'Currency', { currency: item })}
      />
    );
  }

  render() {
    const { dataSource, refreshing } = this.state;
    const { _fetch } = this;

    return (
      <View style={styles.container}>
        <FlatList
          data={dataSource}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_fetch.bind(this)} /> }
        />
      </View>
    );
  }
}

export default Currencies;
