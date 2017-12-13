import { bool, date, func, number, shape, string } from 'prop-types';

const DEFAULT_TIMELINE = 'LAST HOUR';

export default {
  AFILIATES: {
    COINBASE: 'https://www.coinbase.com/join/5568d6215c6e772e19000020',
    ETORO: 'http://etoro.tw/2vM4b6u',
  },

  STORE_URL: {
    ANDROID: 'http://play.google.com/store/apps/details?id=com.sohobase.xcryptos',
    IOS: 'http://sohobase.com',
  },

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

  DEFAULT_TIMELINE,

  DEFAULT_TOKEN: 'xCryptos-Development',

  EXCHANGES: [
    'coinbase',
    'bisq',
    'bitfinex',
    'bitsquare',
    'bitstamp',
    'bittrex',
    'cexio',
    'gdax',
    'kraken',
    'poloniex',
    'coinmama',
    'yobit',
  ],

  FEEDBACK: {
    MAIL: 'hello@soyjavi.com',
    SUBJECT: 'Feedback',
  },

  NODE_ENV: {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
  },

  SHAPE: {
    ALERT: shape({
      currency: string,
      low: number,
      high: number,
      createdAt: date,
    }),
    CURRENCY: shape({
      name: string,
      rank: number,
      symbol: string,
      usd: number,
      btc: number,
    }),
    EXCHANGE: shape({
      MARKET: string,
      PRICE: string,
    }),
    FAVORITE: shape({
      active: bool,
      name: string,
      symbol: string,
      usd: number,
    }),
    HISTORY: shape({
      timestamp: number,
      value: number,
    }),
    NAVIGATION: shape({
      navigate: func,
      setParams: func,
    }),
    SNAPSHOT: shape({
      PRICE: number,
    }),
  },

  STORAGE: {
    CURRENCIES: 'cryptos',
    FAVORITES: 'favorites',
  },

  TIMELINES: [DEFAULT_TIMELINE, 'LAST 3 DAYS', 'LAST 2 MONTHS'],
};
