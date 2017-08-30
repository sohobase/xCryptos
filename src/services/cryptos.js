const serviceUrl = 'https://coinbin.org';

export default {
  async list() {
    const response = await fetch(`${serviceUrl}/coins`); // eslint-disable-line
    const { coins } = await response.json();
    let dataSource = [];

    Object.keys(coins).forEach((coin) => {
      dataSource.push(Object.assign(coins[coin], { symbol: coin }));
    });
    dataSource = dataSource.sort((a, b) => a.rank - b.rank);

    return dataSource;
  },
};
