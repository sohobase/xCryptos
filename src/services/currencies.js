import { C } from '../config';

const CRYPTOCOMPARE_API = 'https://min-api.cryptocompare.com/data';
const CRYPTOCOMPARE = 'https://www.cryptocompare.com/api/data';
const DEFAULT_CURRENCY = 'USD';
const TIMELINE_SERVICE = [
  { timeline: C.TIMELINES[0], endpoint: 'histominute', limit: 60 },
  { timeline: C.TIMELINES[1], endpoint: 'histohour', limit: 72 },
  { timeline: C.TIMELINES[2], endpoint: 'histoday', limit: 60 },
];

export default {
  async list() {
    const response = await fetch(`${CRYPTOCOMPARE}/coinlist`); // eslint-disable-line
    const json = await response.json();
    const { BaseImageUrl, Data } = json;

    let dataSource = Object.keys(Data).map((key) => {
      const { Id, ImageUrl, Name, CoinName, SortOrder } = Data[key];

      return {
        id: Id,
        image: `${BaseImageUrl}${ImageUrl}`,
        name: CoinName,
        symbol: Name,
        rank: parseInt(SortOrder, 0),
      };
    });
    dataSource = dataSource.sort((a, b) => a.rank - b.rank);

    return dataSource;
  },

  async prices(currencies = []) {
    const url = `${CRYPTOCOMPARE_API}/pricemulti?fsyms=${currencies.join(',')}&tsyms=${DEFAULT_CURRENCY}`;
    const response = await fetch(url); // eslint-disable-line
    const json = await response.json();

    const dataSource = {};
    Object.keys(json).forEach((key) => {
      dataSource[key] = json[key][DEFAULT_CURRENCY];
    });

    return dataSource;
  },

  async fetch(symbol) {
    const url = `${CRYPTOCOMPARE}/coinsnapshot/?fsym=${symbol.toUpperCase()}&tsym=${DEFAULT_CURRENCY}`;
    const response = await fetch(url); // eslint-disable-line
    const { Data } = await response.json();
    const { AggregatedData = {}, Exchanges = [] } = Data;

    return {
      price: AggregatedData.PRICE,
      lastUpdate: AggregatedData.LASTUPDATE,
      lastVolume: AggregatedData.LASTVOLUMETO,
      volume: AggregatedData.VOLUME24HOURTO,
      open: AggregatedData.OPEN24HOUR,
      high: AggregatedData.HIGH24HOUR,
      low: AggregatedData.LOW24HOUR,
      exchanges: Exchanges,
    };
  },

  async history(currency, timeline = C.TIMELINES[0]) {
    const { endpoint, limit } = TIMELINE_SERVICE.find(item => item.timeline === timeline);
    const url = `${CRYPTOCOMPARE_API}/${endpoint}?fsym=${currency}&tsym=${DEFAULT_CURRENCY}&limit=${limit}`;
    const response = await fetch(url); // eslint-disable-line
    const { Data = [] } = await response.json();

    return Data.map(({ time, close }) => ({ timestamp: time, value: close }));
  },
};
