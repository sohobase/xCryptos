import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, func } from 'prop-types';
import { FlatList, View } from 'react-native';
import { CurrencyListItem, RefreshCurrencies } from './components';
import { C, STYLE } from '../config';
import { add_favorite, remove_favorite } from '../actions';

const keyExtractor = item => item.rank;

class CurrenciesScreen extends Component {
  static navigationOptions = {
    title: 'Currencies',
  };

  constructor(props) {
    super(props);
    this._onChangeItem = this._onChangeItem.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }

  async _onChangeItem({ currency, favorite }) {
    if (favorite) this.props.removeFavorite(currency);
    else this.props.addFavorite(currency);
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
      <View style={STYLE.SCREEN}>
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
  addFavorite: func,
  currencies: arrayOf(C.SHAPE.CURRENCY),
  favorites: arrayOf(C.SHAPE.FAVORITE),
  navigation: C.SHAPE.NAVIGATION,
  removeFavorite: func,
};

CurrenciesScreen.defaultProps = {
  addFavorite() {},
  currencies: [],
  favorites: [],
  navigation: {
    navigate() {},
  },
  removeFavorite() {},
};

const mapStateToProps = state => ({
  currencies: state.currencies,
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({
  addFavorite: favorite => dispatch(add_favorite(favorite)),
  removeFavorite: favorite => dispatch(remove_favorite(favorite)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesScreen);
