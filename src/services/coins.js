import { C } from '../config';
import { fetch } from './modules';

const {
  CURRENCY: { USD }, EXCHANGES, SERVICE: { CURRENCIES: { API, MIN_API } }, TIMELINES,
} = C;
const TIMELINE_SERVICE = [
  { timeline: TIMELINES[0], endpoint: 'histominute', limit: 60 },
  { timeline: TIMELINES[1], endpoint: 'histohour', limit: 30 },
  { timeline: TIMELINES[2], endpoint: 'histoday', limit: 30 },
  { timeline: TIMELINES[3], endpoint: 'histoday', limit: 90 },
];

export default {
  async list() {
    const response = await fetch(`${API}/coinlist`);
    if (!response) return undefined;

    const { BaseImageUrl: url, Data } = response;
    const dataSource = Object.values(Data).map(({
      Id: id, ImageUrl: image, Name: coin, CoinName: name, SortOrder,
    }) => ({
      id, image: `${url}${image}`, name, coin, rank: parseInt(SortOrder, 0),
    }));

    return dataSource.sort((a, b) => a.rank - b.rank);
  },

  async prices(coins = [], currency = USD) {
    const response = await fetch(`${MIN_API}/pricemultifull?fsyms=${coins.join(',')}&tsyms=${currency}`);
    if (!response) return undefined;

    const values = {};
    Object.keys(response.RAW).forEach((key) => {
      const { PRICE = 0, CHANGE24HOUR = 0 } = response.RAW[key][currency];
      values[key] = { price: parseFloat(PRICE, 10), trend: parseFloat(CHANGE24HOUR, 10) };
    });

    return values;
  },

  async fetch(coin, currency = USD) {
    const url = `${API}/coinsnapshot/?fsym=${coin.toUpperCase()}&tsym=${currency}`;
    const response = await fetch(url);
    if (!response) return undefined;
    const { Data: { AggregatedData: data = {} } } = response;

    return {
      price: data.PRICE,
      lastUpdate: data.LASTUPDATE,
      lastVolume: data.LASTVOLUMETO,
      volume: data.VOLUME24HOURTO,
      open: data.OPEN24HOUR,
      high: data.HIGH24HOUR,
      low: data.LOW24HOUR,
    };
  },

  async history(coin, timeline = TIMELINES[0], currency = USD) {
    const { endpoint, limit } = TIMELINE_SERVICE.find(item => item.timeline === timeline);
    const url = `${MIN_API}/${endpoint}?fsym=${coin}&tsym=${currency}&limit=${limit}`;
    const response = await fetch(url);
    if (!response) return undefined;

    return response.Data.map(({ time, close }) => ({ timestamp: time, value: close }));
  },
};
