const COINBIN = 'https://coinbin.org';
const CRYPTOCOMPARE_API = 'https://min-api.cryptocompare.com/data';
const CRYPTOCOMPARE = 'https://www.cryptocompare.com/api/data';

const DEFAULT_CURRENCY = 'USD';

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

  async history(currency) {
    const url = `${COINBIN}/${currency}/history`;
    const response = await fetch(url); // eslint-disable-line
    const { history } = await response.json();

    return { history };
  },
};
