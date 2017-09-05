import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, func } from 'prop-types';
import { FlatList, RefreshControl, View } from 'react-native';
import { addFavoriteAction, removeFavoriteAction, saveCurrenciesAction } from '../actions';
import { CurrencyListItem } from '../components';
import { C, STYLE, THEME } from '../config';
import { ServiceCurrencies } from '../services';

const keyExtractor = item => item.rank;

class CurrenciesScreen extends Component {
  static navigationOptions = {
    title: 'Currencies',
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
    this._onChangeItem = this._onChangeItem.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._fetch = this._fetch.bind(this);
  }

  async _onChangeItem({ currency, favorite }) {
    if (favorite) this.props.removeFavorite(currency);
    else this.props.addFavorite(currency);
  }

  async _fetch() {
    const { saveCurrencies } = this.props;

    this.setState({ refreshing: true });
    saveCurrencies(await ServiceCurrencies.list());
    this.setState({ refreshing: false });
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
    const { _fetch, _renderItem } = this;
    const { currencies, favorites } = this.props;
    const { refreshing } = this.state;

    return (
      <View style={STYLE.SCREEN}>
        <FlatList
          data={currencies}
          keyExtractor={keyExtractor}
          extraData={favorites}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_fetch} tintColor={THEME.WHITE} />}
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
  saveCurrencies: func,
};

CurrenciesScreen.defaultProps = {
  addFavorite() {},
  currencies: [],
  favorites: [],
  navigation: {
    navigate() {},
  },
  removeFavorite() {},
  saveCurrencies() {},
};

const mapStateToProps = state => ({
  currencies: state.currencies,
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({
  addFavorite: favorite => dispatch(addFavoriteAction(favorite)),
  removeFavorite: favorite => dispatch(removeFavoriteAction(favorite)),
  saveCurrencies: currencies => dispatch(saveCurrenciesAction(currencies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesScreen);
