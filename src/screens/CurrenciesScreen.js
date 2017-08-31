import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, func } from 'prop-types';
import { Button, FlatList, View } from 'react-native';

import { CurrencyListItem, RefreshCurrencies } from './components';
import { C } from '../config';
import { ServiceFavorites } from '../services';
import { save_favorites } from '../actions';
import styles from './CurrenciesScreen.style';

const keyExtractor = item => item.rank;

class CurrenciesScreen extends Component {
  static navigationOptions = {
    title: 'Currencies',
    // headerRight: <Button title="Search" />,
  };

  constructor(props) {
    super(props);
    this._onChangeItem = this._onChangeItem.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }

  async _onChangeItem({ currency, favorite }) {
    this.props.saveFavorites(await ServiceFavorites[favorite ? 'remove' : 'add'](currency));
  }

  _renderItem({ item }) {
    const { favorites, navigation: { navigate } } = this.props;

    return (
      <CurrencyListItem
        currency={item}
        favorite={favorites.findIndex(({ symbol }) => symbol === item.symbol) > -1}
        onPress={() => navigate('Currency', { currency: item })}
        onChange={this._onChangeItem}
      />
    );
  }

  render() {
    const { currencies, favorites } = this.props;
    const { _renderItem } = this;

    return (
      <View style={styles.container}>
        <FlatList
          data={currencies}
          keyExtractor={keyExtractor}
          extraData={favorites}
          refreshControl={<RefreshCurrencies />}
          renderItem={_renderItem}
        />
      </View>
    );
  }
}

CurrenciesScreen.propTypes = {
  currencies: arrayOf(C.SHAPE.CURRENCY),
  favorites: arrayOf(C.SHAPE.FAVORITE),
  navigation: C.SHAPE.NAVIGATION,
  saveFavorites: func,
};

CurrenciesScreen.defaultProps = {
  currencies: [],
  favorites: [],
  navigation: {
    navigate() {},
  },
  saveFavorites() {},
};

const mapStateToProps = state => ({
  currencies: state.currencies,
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({
  saveFavorites: favorites => dispatch(save_favorites(favorites)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesScreen);
