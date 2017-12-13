import { bool, date, func, number, string } from 'prop-types';

export default {
  ALERT: {
    currency: string,
    low: number,
    high: number,
    createdAt: date,
  },
  CURRENCY: {
    name: string,
    rank: number,
    symbol: string,
    usd: number,
    btc: number,
  },
  EXCHANGE: {
    MARKET: string,
    PRICE: string,
  },
  FAVORITE: {
    active: bool,
    name: string,
    symbol: string,
    usd: number,
  },
  HISTORY: {
    timestamp: number,
    value: number,
  },
  NAVIGATION: {
    navigate: func,
    setParams: func,
  },
  SNAPSHOT: {
    PRICE: number,
  },
};
