import { bool, func, shape, string, number } from 'prop-types';

export default {
  DEFAULT_FAVORITES: [{
    active: true,
    id: 1182,
    image: 'https://www.cryptocompare.com/media/19633/btc.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    usd: 0,
  }, {
    id: 7605,
    image: 'https://www.cryptocompare.com/media/20646/eth.png',
    name: 'Ethereum',
    symbol: 'ETH',
    usd: 0,
  }, {
    id: 3808,
    image: 'https://www.cryptocompare.com/media/19782/litecoin-logo.png',
    name: 'Litecoin',
    symbol: 'LTC',
    usd: 0,
  }],

  ICON: {
    add: require('../assets/icon-add.png'),
    alert: require('../assets/icon-alert.png'),
    menu: require('../assets/icon-menu.png'),
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
    HISTORY: shape({
      timestamp: number,
      value: number,
    }),
  },

  STORAGE: {
    CURRENCIES: 'cryptos',
    FAVORITES: 'favorites',
  },

  TIMELINES: ['1h', '48h', '60D'],
};
