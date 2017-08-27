import React, { Component } from 'react';
import {
  Button,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { C } from '../modules'
import { ServiceStorage, ServiceCryptos } from '../services'
import { FavoriteItem, VirtualKeyboard } from './components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  favorites: {
    backgroundColor: 'red',
  }
});

class Main extends Component {

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;

    return {
      title: 'Cryptos',
      headerRight: <Button title="Add" onPress={() => navigate('Currencies')} />
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
      const cryptos = await ServiceStorage.get(C.STORAGE.CRYPTOS);
      const favorites = await ServiceCryptos.favorites();

      this.setState({
        favorites,
        ready: true,
      });
    } catch (e) {
      console.log('error', e);
    }
  }

  _keyExtractor = (item) => item;

  _renderItem = ({ item }) => {
    return (
      <FavoriteItem currency={item} />
    );
  }

  _onNumber = (number) => this.setState({ value: `${this.state.value}${number}` });

  _onDelete = (value) => this.setState({ value: this.state.value.slice(0, -1) });

  render() {
    const { navigate } = this.props.navigation;
    const { favorites, value } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar
           backgroundColor="blue"
           barStyle="light-content"
        />
        <FlatList
          style={styles.favorites}
          keyExtractor={this._keyExtractor}
          data={favorites}
          renderItem={this._renderItem}
        />
        <Text>{value}</Text>
        <VirtualKeyboard onNumber={this._onNumber} onDelete={this._onDelete} />
      </View>
    );
  }
}

export default Main;
