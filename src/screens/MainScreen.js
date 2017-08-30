import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, shape, string, number } from 'prop-types';
import {
  Button,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

import { THEME } from '../config';
import { ServiceFavorites } from '../services';
import { FavoriteItem, RefreshCurrencies, VirtualKeyboard } from './components';
import { save_favorites, save_currencies } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  favorites: {
    flex: 1,
    backgroundColor: THEME.PRIMARY,
  },
});

function keyExtractor(item) {
  return item.symbol;
}

class Main extends Component {
  static navigationOptions({ navigation }) {
    const { navigate } = navigation;

    return {
      headerLeft: <Button title="menu" onPress={() => navigate('Currencies')} />,
      title: 'Cryptos',
      headerRight: <Button title="Add" onPress={() => navigate('Currencies')} />,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
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

  _onPressItem(currency) {
    this.props.navigation.navigate('Currency', { currency });
  }

  _renderItem({ item }) {
    const { navigate } = this.props.navigation;
    const { value } = this.state;

    return (
      <FavoriteItem
        currency={item}
        onPress={() => navigate('Currency', { currency: item })}
        value={value}
      />
    );
  }

  _onChangeValue(value) {
    this.setState({ value });
    this.forceUpdate();
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
          refreshControl={<RefreshCurrencies autoRefresh />}
          renderItem={this._renderItem}
          style={styles.favorites}
        />
        <VirtualKeyboard onChange={this._onChangeValue} value={value} />
      </View>
    );
  }
}

Main.propTypes = {
  favorites: shape({
    name: string,
    rank: number,
    symbol: string,
    usd: number,
  }),
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
