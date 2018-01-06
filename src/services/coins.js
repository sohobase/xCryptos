import { C } from '../config';
import { fetch } from './modules';

const {
  CURRENCY: { USD }, EXCHANGES, SERVICE: { CURRENCIES: { API, MIN_API } }, TIMELINES,
} = C;
const TIMELINE_SERVICE = [
  { timeline: TIMELINES[0], endpoint: 'histohour', limit: 30 },
  { timeline: TIMELINES[1], endpoint: 'histoday', limit: 30 },
  { timeline: TIMELINES[2], endpoint: 'histoday', limit: 90 },
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
    const response = await fetch(`${MIN_API}/pricemulti?fsyms=${coins.join(',')}&tsyms=${currency}`);
    if (!response) return undefined;

    const values = {};
    Object.keys(response).forEach((key) => {
      values[key] = response[key][currency];
    });

    return values;
  },

  async fetch(coin, currency = USD) {
    const url = `${API}/coinsnapshot/?fsym=${coin.toUpperCase()}&tsym=${currency}`;
    const response = await fetch(url);
    if (!response) return undefined;
    const { Data: { AggregatedData = {}, Exchanges = [] } } = response;

    return {
      price: AggregatedData.PRICE,
      lastUpdate: AggregatedData.LASTUPDATE,
      lastVolume: AggregatedData.LASTVOLUMETO,
      volume: AggregatedData.VOLUME24HOURTO,
      open: AggregatedData.OPEN24HOUR,
      high: AggregatedData.HIGH24HOUR,
      low: AggregatedData.LOW24HOUR,
      exchanges: Exchanges
        .filter(({ MARKET }) => EXCHANGES.includes(MARKET.toLowerCase()))
        .sort((a, b) => (a.PRICE > b.PRICE ? 0 : -1)),
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
