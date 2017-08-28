import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StatusBar,
  StyleSheet,
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
    backgroundColor: 'red',
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
      ready: false,
      value: '',
    };
  }

  async componentWillMount() {
    try {
      const currencies = await ServiceStorage.get(C.STORAGE.CRYPTOS);
      this.setState({ ready: currencies && currencies.length > -1 });
    } catch (e) {
      console.error('error', e);
    }
  }

  async componentDidMount() {
    const currencies = await ServiceCryptos.list();
    this.setState({ ready: true });
  }

  async componentWillUpdate() {
    this.setState({ favorites: await ServiceFavorites.list() });
  }

  _keyExtractor = (item) => item.symbol;

  _onPressItem = (currency) => this.props.navigation.navigate('Currency', { currency });

  _renderItem = ({ item }) => {
    return (
      <FavoriteItem currency={item} onPress={this._onPressItem.bind(null, item)} />
    );
  }
  _onNumber = (number) => this.setState({ value: `${this.state.value}${number}` });

  _onDelete = (value) => this.setState({ value: this.state.value.slice(0, -1) });

  render() {
    const { navigate } = this.props.navigation;
    const { favorites = [], value, ready } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        {
          ready ?
            <FlatList
              style={styles.favorites}
              keyExtractor={(this._keyExtractor)}
              data={favorites}
              renderItem={this._renderItem}
            />
          :
            <ActivityIndicator />
        }
        <VirtualKeyboard onNumber={this._onNumber} onDelete={this._onDelete} />
      </View>
    );
  }
}

export default Main;
