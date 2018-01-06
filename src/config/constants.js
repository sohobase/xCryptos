const TIMELINE = '24 HOURS';

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
      coin: 'BTC',
      hodl: undefined,
      image: 'https://www.cryptocompare.com/media/19633/btc.png',
      name: 'Bitcoin',
      price: 0,
    }, {
      coin: 'ETH',
      hodl: undefined,
      image: 'https://www.cryptocompare.com/media/20646/eth.png',
      name: 'Ethereum',
      price: 0,
    }, {
      coin: 'LTC',
      hodl: undefined,
      image: 'https://www.cryptocompare.com/media/19782/litecoin-logo.png',
      name: 'Litecoin',
      price: 0,
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
    'hitbtc',
    'kraken',
    'poloniex',
    'localbitcoins',
    'gatecoin',
    'yobit',
    'coinfloor',
    'livecoin',
    'gemini',
  ],

  NODE_ENV: {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
  },

  SERVICE: {
    API: 'https://xcryptos.glitch.me',
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

  TIMELINES: [TIMELINE, '30 DAYS', '3 MONTHS'],

  TIMEOUT_SERVICE: 10000,
};
