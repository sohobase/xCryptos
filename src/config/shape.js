import { bool, date, func, number, string } from 'prop-types';

export default {
  ALERT: {
    coin: string, // Example: 'BTC'
    currency: string, // Example: 'USD'
    low: number,
    high: number,
    createdAt: date,
  },
  COIN: {
    coin: string,
    name: string,
    price: number,
    rank: number,
  },
  EXCHANGE: {
    MARKET: string,
    PRICE: string,
  },
  FAVORITE: {
    coin: string,
    hodl: number,
    name: string,
    price: number,
    trend: number,
  },
  HISTORY: {
    timestamp: number,
    value: number,
  },
  NAVIGATION: {
    navigate: func,
    setParams: func,
  },
  SETTINGS: {
    currency: string, // Example: 'USD'
    language: string,
  },
  SNAPSHOT: {
    PRICE: number,
  },
};
