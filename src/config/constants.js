import { bool, string, number } from 'prop-types';

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
    CURRENCY: {
      name: string,
      rank: number,
      symbol: string,
      usd: number,
      btc: number,
    },
    FAVORITE: {
      active: bool,
      name: string,
      symbol: string,
      usd: number,
    },
  },
};
