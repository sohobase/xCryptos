import { arrayOf, shape, func } from 'prop-types';
import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { FlatList, RefreshControl, View } from 'react-native';
import {
  addFavoriteAction,
  removeFavoriteAction,
  saveCurrenciesAction,
  updatePricesAction,
} from '../../actions';
import { SHAPE, STYLE, TEXT } from '../../config';
import { ServiceCurrencies } from '../../services';
import { ListItem } from './components';
import styles from './Coins.style';

const { CURRENCY, FAVORITE } = SHAPE;
const { EN: { COINS, SEARCH } } = TEXT;

class CoinsScreen extends Component {
  static navigationOptions = {
    title: COINS,
  };

  constructor(props) {
    super(props);
    this.state = {
      filteredCurrencies: undefined,
      refreshing: false,
    };
    this._onChangeItem = this._onChangeItem.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._fetch = this._fetch.bind(this);
  }

  async componentWillMount() {
    const { currencies } = this.props;

    if (currencies.length === 0) this._fetch();
  }

  async _fetch() {
    const { saveCurrencies } = this.props;

    this.setState({ refreshing: true });
    await ServiceCurrencies.list().then(saveCurrencies);
    this.setState({ refreshing: false });
  }

  async _onChangeItem({ currency, favorite }) {
    const {
      addFavorite, favorites, removeFavorite, updatePrices,
    } = this.props;

    if (favorite) removeFavorite(currency);
    else {
      addFavorite(currency);
      const symbols = [...favorites, currency].map(({ symbol }) => symbol);
      ServiceCurrencies.prices(symbols).then(updatePrices);
    }
  }

  _onSearch(value) {
    const { currencies } = this.props;
    const search = value.toLowerCase();

    this.setState({
      filteredCurrencies: currencies.filter(({ name, symbol }) => {
        return name.toLowerCase().indexOf(search) > -1 || symbol.toLowerCase().indexOf(search) > -1;
      }),
    });
  }

  _renderItem({ item }) {
    const { favorites } = this.props;

    return (
      <ListItem
        currency={item}
        favorite={favorites.findIndex(({ symbol }) => symbol === item.symbol) > -1}
        onChange={this._onChangeItem}
      />
    );
  }

  render() {
    const { _fetch, _onSearch, _renderItem } = this;
    const { currencies, favorites } = this.props;
    const { filteredCurrencies, refreshing } = this.state;

    return (
      <View style={STYLE.SCREEN}>
        <SearchBar
          containerStyle={styles.searchBar}
          inputStyle={styles.input}
          lightTheme
          onChangeText={_onSearch}
          placeholder={`${SEARCH}...`}
        />
        <FlatList
          data={filteredCurrencies || currencies}
          keyExtractor={item => item.rank}
          extraData={favorites}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_fetch} />}
          renderItem={_renderItem}
          style={styles.list}
        />
      </View>
    );
  }
}

CoinsScreen.propTypes = {
  addFavorite: func,
  currencies: arrayOf(shape(CURRENCY)),
  favorites: arrayOf(shape(FAVORITE)),
  removeFavorite: func,
  saveCurrencies: func,
  updatePrices: func,
};

CoinsScreen.defaultProps = {
  addFavorite() {},
  currencies: [],
  favorites: [],
  removeFavorite() {},
  saveCurrencies() {},
  updatePrices() {},
};

const mapStateToProps = state => ({
  currencies: state.currencies,
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({
  addFavorite: favorite => dispatch(addFavoriteAction(favorite)),
  removeFavorite: favorite => dispatch(removeFavoriteAction(favorite)),
  saveCurrencies: currencies => currencies && dispatch(saveCurrenciesAction(currencies)),
  updatePrices: prices => prices && dispatch(updatePricesAction(prices)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinsScreen);
