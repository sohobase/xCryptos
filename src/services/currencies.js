const serviceCoinbin = 'https://coinbin.org';
const serviceCryptocompare = 'https://min-api.cryptocompare.com/data';

export default {
  async list() {
    const response = await fetch(`${serviceCoinbin}/coins`); // eslint-disable-line
    const { coins } = await response.json();
    let dataSource = [];

    Object.keys(coins).forEach((coin) => {
      dataSource.push(Object.assign(coins[coin], { symbol: coin }));
    });
    dataSource = dataSource.sort((a, b) => a.rank - b.rank);

    return dataSource;
  },

  async prices(currencies = []) {
    const url = `${serviceCryptocompare}/pricemulti?fsyms=${currencies.join(',').toUpperCase()}&tsyms=USD`;
    const response = await fetch(url); // eslint-disable-line
    const json = await response.json();

    return json;
  },

  async fetch(currency) {
    const url = `${serviceCoinbin}/${currency}/history`;
    const response = await fetch(url); // eslint-disable-line
    const { history } = await response.json();

    return { history };
  },

  forecast(currency) {

  }

};
