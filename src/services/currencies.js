const COINBIN = 'https://coinbin.org';
const CRYPTOCOMPARE_API = 'https://min-api.cryptocompare.com/data';
const CRYPTOCOMPARE = 'https://www.cryptocompare.com/api/data';

export default {
  async list() {
    const response = await fetch(`${COINBIN}/coins`); // eslint-disable-line
    const { coins } = await response.json();
    let dataSource = [];

    Object.keys(coins).forEach((coin) => {
      dataSource.push(Object.assign(coins[coin], { symbol: coin }));
    });
    dataSource = dataSource.sort((a, b) => a.rank - b.rank);

    return dataSource;
  },

  async prices(currencies = []) {
    const url = `${CRYPTOCOMPARE_API}/pricemulti?fsyms=${currencies.join(',').toUpperCase()}&tsyms=USD`;
    const response = await fetch(url); // eslint-disable-line
    const json = await response.json();

    return json;
  },

  async fetch(symbol) {
    const url = `${CRYPTOCOMPARE}/coinsnapshot/?fsym=${symbol.toUpperCase()}&tsym=USD`;
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
