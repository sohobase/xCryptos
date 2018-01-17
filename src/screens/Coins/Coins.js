import { arrayOf, shape, func } from 'prop-types';
import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { FlatList, RefreshControl, View } from 'react-native';
import {
  addFavoriteAction,
  removeFavoriteAction,
  saveCoinsAction,
  updatePricesAction,
} from '../../actions';
import { ButtonIcon } from '../../components';
import { SHAPE, STYLE, TEXT, THEME } from '../../config';
import { ServiceCoins } from '../../services';
import { ListItem } from './components';
import styles from './Coins.style';

const { COIN, FAVORITE, SETTINGS } = SHAPE;
const { EN: { COINS, SEARCH } } = TEXT;

class CoinsScreen extends Component {
  static navigationOptions() {
    return {
      title: COINS,
      headerRight: <ButtonIcon />,
      headerStyle: { backgroundColor: THEME.WHITE },
      headerTintColor: THEME.BLACK,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      filteredCoins: undefined,
      refreshing: false,
    };
    this._onChangeItem = this._onChangeItem.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._fetch = this._fetch.bind(this);
  }

  async componentWillMount() {
    if (this.props.coins.length === 0) this._fetch();
  }

  async _fetch() {
    const { saveCoins } = this.props;

    this.setState({ refreshing: true });
    await ServiceCoins.list().then(saveCoins);
    this.setState({ refreshing: false });
  }

  async _onChangeItem({ coin, favorite }) {
    const {
      addFavorite, favorites, removeFavorite, settings: { currency }, updatePrices,
    } = this.props;

    if (favorite) removeFavorite(coin);
    else {
      addFavorite(coin);
      const coins = [...favorites, coin].map(item => item.coin);
      ServiceCoins.prices(coins, currency).then(updatePrices);
    }
  }

  _onSearch(value) {
    const { coins } = this.props;
    const search = value.toLowerCase();

    this.setState({
      filteredCoins: coins.filter(({ name, coin }) => {
        return name.toLowerCase().indexOf(search) > -1 || coin.toLowerCase().indexOf(search) > -1;
      }),
    });
  }

  _renderItem({ item }) {
    const { favorites } = this.props;

    return (
      <ListItem
        coin={item}
        favorite={favorites.findIndex(({ coin }) => coin === item.coin) > -1}
        onChange={this._onChangeItem}
      />
    );
  }

  render() {
    const { _fetch, _onSearch, _renderItem } = this;
    const { coins, favorites } = this.props;
    const { filteredCoins, refreshing } = this.state;

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
          data={filteredCoins || coins}
          keyExtractor={item => item.coin}
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
  coins: arrayOf(shape(COIN)),
  favorites: arrayOf(shape(FAVORITE)),
  removeFavorite: func,
  saveCoins: func,
  settings: shape(SETTINGS),
  updatePrices: func,
};

CoinsScreen.defaultProps = {
  addFavorite() {},
  coins: [],
  favorites: [],
  removeFavorite() {},
  saveCoins() {},
  settings: {},
  updatePrices() {},
};

const mapStateToProps = ({ coins, favorites, settings }) => ({
  coins,
  favorites,
  settings,
});

const mapDispatchToProps = dispatch => ({
  addFavorite: favorite => dispatch(addFavoriteAction(favorite)),
  removeFavorite: favorite => dispatch(removeFavoriteAction(favorite)),
  saveCoins: coins => coins && dispatch(saveCoinsAction(coins)),
  updatePrices: prices => prices && dispatch(updatePricesAction(prices)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinsScreen);
