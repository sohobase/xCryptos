import { bool, func, shape, string, number } from 'prop-types';

const icons = ['Bitcoin', 'Etherium', 'Dash', 'Ripple', 'Litecoin']

export default {
  DEFAULT_FAVORITES: [{
    active: true,
    name: 'Bitcoin',
    symbol: 'btc',
    usd: 0,
  }, {
    name: 'Ethereum',
    symbol: 'eth',
    usd: 0,
  }, {
    name: 'Litecoin',
    symbol: 'ltc',
    usd: 0,
  }],
  STORAGE: {
    CURRENCIES: 'cryptos',
    FAVORITES: 'favorites',
  },
  SHAPE: {
    CURRENCY: shape({
      name: string,
      rank: number,
      symbol: string,
      usd: number,
      btc: number,
    }),
    FAVORITE: shape({
      active: bool,
      name: string,
      symbol: string,
      usd: number,
    }),
    NAVIGATION: shape({
      navigate: func,
    }),
    SNAPSHOT: shape({
      PRICE: number,
    }),
  },
  ICON: {
    Bitcoin: require('../assets/Bitcoin.png'),
    Ethereum: require('../assets/Ethereum.png'),
    Litecoin: require('../assets/Litecoin.png'),
    Ripple: require('../assets/Ripple.png'),
    Monero: require('../assets/Monero.png'),
    Dash: require('../assets/Dash.png'),
  },
};
