import { C } from '../config';
import { fetch } from './modules';

const { CURRENCY: { USD }, EXCHANGES, TIMELINES } = C;
const CRYPTOCOMPARE_API = 'https://min-api.cryptocompare.com/data';
const CRYPTOCOMPARE = 'https://www.cryptocompare.com/api/data';
const TIMELINE_SERVICE = [
  { timeline: TIMELINES[0], endpoint: 'histominute', limit: 60 },
  { timeline: TIMELINES[1], endpoint: 'histohour', limit: 72 },
  { timeline: TIMELINES[2], endpoint: 'histoday', limit: 60 },
];

export default {
  async list() {
    const response = await fetch(`${CRYPTOCOMPARE}/coinlist`);
    if (!response) return undefined;

    const { BaseImageUrl: url, Data } = response;
    const dataSource = Object.values(Data).map(({
      Id: id, ImageUrl: image, Name: symbol, CoinName: name, SortOrder,
    }) => ({
      id, image: `${url}${image}`, name, symbol, rank: parseInt(SortOrder, 0),
    }));

    return dataSource.sort((a, b) => a.rank - b.rank);
  },

  async prices(currencies = []) {
    const response = await fetch(`${CRYPTOCOMPARE_API}/pricemulti?fsyms=${currencies.join(',')}&tsyms=${USD}`);
    if (!response) return undefined;

    const values = {};
    Object.keys(response).forEach((key) => {
      values[key] = values[key][USD];
    });

    return values;
  },

  async fetch(symbol) {
    const url = `${CRYPTOCOMPARE}/coinsnapshot/?fsym=${symbol.toUpperCase()}&tsym=${USD}`;
    const response = await fetch(url);
    if (!response) return undefined;
    const { Data: { AggregatedData = {}, Exchanges = [] } } = response;

    const exchanges = [];
    EXCHANGES.forEach((exchange) => {
      const found = Exchanges.find(item => item.MARKET.toLowerCase() === exchange);
      if (found) exchanges.push(found);
    });

    return {
      price: AggregatedData.PRICE,
      lastUpdate: AggregatedData.LASTUPDATE,
      lastVolume: AggregatedData.LASTVOLUMETO,
      volume: AggregatedData.VOLUME24HOURTO,
      open: AggregatedData.OPEN24HOUR,
      high: AggregatedData.HIGH24HOUR,
      low: AggregatedData.LOW24HOUR,
      exchanges,
    };
  },

  async history(currency, timeline = TIMELINES[0]) {
    const { endpoint, limit } = TIMELINE_SERVICE.find(item => item.timeline === timeline);
    const response = await fetch(`${CRYPTOCOMPARE_API}/${endpoint}?fsym=${currency}&tsym=${USD}&limit=${limit}`);
    if (!response) return undefined;

    return response.Data.map(({ time, close }) => ({ timestamp: time, value: close }));
  },
};
