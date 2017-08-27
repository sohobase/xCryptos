import React, { Component } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { CryptoListItem } from './components';
import { C } from '../../modules';
import { ServiceCryptos, ServiceStorage } from '../../services';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class AvailableCryptos extends Component {

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
        favorites: await ServiceCryptos.favorites(),
      });
      this.setState({ dataSource: await ServiceCryptos.list() });
    } catch (e) {
      console.log('error', e);
    }
  }

  async _fetch() {
    this.setState({ refreshing: true });

    dataSource = await ServiceCryptos.list();
    this.setState({ dataSource, refreshing: false });
  }

  _keyExtractor = (item) => item.rank;

  _renderItem = ({ item }) => {
    return (
      <CryptoListItem
        currency={item}
        favorite={this.state.favorites.indexOf(item.symbol) > -1}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._fetch.bind(this)}
            />
          }
        />
      </View>
    );
  }
}

export default AvailableCryptos;
