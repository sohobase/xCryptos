import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  VirtualizedList,
  StatusBar,
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
      ready: false,
      value: 1,
    };
  }

  async componentWillMount() {
    try {
      const currencies = await ServiceStorage.get(C.STORAGE.CRYPTOS);
      this.setState({
        favorites: await ServiceFavorites.list(),
        ready: currencies && currencies.length > -1
      });
    } catch (e) {
      console.error('error', e);
    }
  }

  async componentDidMount() {
    const currencies = await ServiceCryptos.list();
    this.setState({ ready: true });
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
              extraData={this.state.value}
            />
          :
            <ActivityIndicator />
        }
        <VirtualKeyboard onChange={this._onChangeValue} value={value} />
      </View>
    );
  }
}

export default Main;
