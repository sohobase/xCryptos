const serviceUrl = 'https://coinbin.org';

export default {
  async list() {
    const response = await fetch(`${serviceUrl}/coins`).catch(() => console.log('error'));

    const { coins } = await response.json();
    const dataSource = [];
    Object.keys(coins).forEach((coin) => {
      if (coins[coin].rank < 32) {
        dataSource.push(Object.assign(coins[coin], { symbol: coin }));
      }
    });
    return dataSource.sort((a, b) => a.rank - b.rank);
  },
};
