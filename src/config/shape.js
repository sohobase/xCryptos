import { bool, date, func, number, string } from 'prop-types';

export default {
  ALERT: {
    currency: string,
    low: number,
    high: number,
    createdAt: date,
  },
  CURRENCY: {
    active: bool,
    name: string,
    price: number,
    rank: number,
    symbol: string,
    btc: number,
  },
  EXCHANGE: {
    MARKET: string,
    PRICE: string,
  },
  FAVORITE: {
    active: bool,
    price: number,
    hodl: number,
    name: string,
    symbol: string,
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
    currency: string,
    language: string,
  },
  SNAPSHOT: {
    PRICE: number,
  },
};
