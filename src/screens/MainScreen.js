import React, { Component } from 'react';
import {
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { C, THEME } from '../config'
import { ServiceFavorites, ServiceStorage, ServiceCryptos } from '../services'
import { FavoriteItem, VirtualKeyboard } from './components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  favorites: {
    flex: 1,
    backgroundColor: THEME.PRIMARY,
  },
});

class Main extends Component {

  static navigationOptions({ navigation }) {
    const { navigate } = navigation;

    return {
      title: 'Cryptos',
      headerRight: <Button title="Add" onPress={() => navigate('Currencies')} />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      refreshing: false,
      value: 1,
    };
  }

  async componentWillMount() {
    const currencies = await ServiceStorage.get(C.STORAGE.CRYPTOS);
    this.setState({
      favorites: await ServiceFavorites.list(),
      refreshing: !currencies,
    });
  }

  componentDidMount() {
    this._fetch();
  }

  async _fetch() {
    this.setState({ refreshing: true });
    await ServiceCryptos.list();
    this.setState({ refreshing: false });
  }

  _keyExtractor = (item) => item.symbol;

  _onPressItem = (currency) => this.props.navigation.navigate('Currency', { currency });

  _renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;
    const { value } = this.state;

    return (
      <FavoriteItem
        currency={item}
        onPress={navigate.bind(null, 'Currency', { currency: item })}
        value={value}
      />
    );
  }

  _onChangeValue = (value) => {
    this.setState({ value });
    this.forceUpdate();
  }

  render() {
    const { favorites = [], value, refreshing } = this.state;
    const { _fetch } = this;

    return (
      <View style={styles.container}>
        <FlatList
          data={favorites}
          extraData={this.state}
          keyExtractor={(this._keyExtractor)}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_fetch.bind(this)} />}
          renderItem={this._renderItem}
          style={styles.favorites}
        />
        <VirtualKeyboard onChange={this._onChangeValue} value={value} />
      </View>
    );
  }
}

export default Main;
