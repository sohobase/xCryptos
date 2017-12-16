import { bool, date, func, number, shape, string } from 'prop-types';

const TIMELINE = 'LAST HOUR';

export default {
  AFILIATES: {
    COINBASE: 'https://www.coinbase.com/join/5568d6215c6e772e19000020',
    ETORO: 'http://etoro.tw/2vM4b6u',
  },

  CURRENCY: {
    EUR: 'EUR',
    USD: 'USD',
    GBP: 'GBP',
    JPY: 'JPY',
  },

  SYMBOL: {
    EUR: '€',
    USD: '$',
    GBP: '£',
    JPY: '¥',
  },

  DEFAULT: {
    FAVORITES: [{
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
    SETTINGS: { currency: 'USD', language: 'English' },
    TIMELINE,
    TOKEN: 'xCryptos-Development',
  },

  EXCHANGES: [
    'coinbase',
    'bitfinex',
    'bitsquare',
    'bitstamp',
    'bittrex',
    'cexio',
    'gdax',
    'kraken',
    'poloniex',
  ],

  NODE_ENV: {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
  },

  SERVICE: {
    ALERTS: 'https://xcryptos.glitch.me/alerts',
    CURRENCIES: {
      API: 'https://www.cryptocompare.com/api/data',
      MIN_API: 'https://min-api.cryptocompare.com/data',
    },
  },

  SOHOBASE: {
    URL: 'http://sohobase.co',
    MAIL: 'hi@sohobase.co',
  },

  STORAGE: {
    CURRENCIES: 'cryptos',
    FAVORITES: 'favorites',
  },

  STORE_URL: {
    ANDROID: 'http://play.google.com/store/apps/details?id=com.sohobase.xcryptos',
    IOS: 'http://sohobase.com',
  },

  TIMELINES: [TIMELINE, 'LAST 3 DAYS', 'LAST 2 MONTHS'],

  TIMEOUT_SERVICE: 10000,
};
