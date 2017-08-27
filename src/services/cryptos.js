import { C } from '../modules';
import ServiceStorage from './storage';

const serviceUrl = 'https://coinbin.org';

export default {
  async list() {
    const response = await fetch(`${serviceUrl}/coins`);

    const { coins } = await response.json();
    let dataSource = [];
    Object.keys(coins).forEach((coin) => {
      if (coins[coin].rank < 32) {
        dataSource.push(Object.assign(coins[coin], { symbol: coin }));
      }
    });
    dataSource = dataSource.sort((a, b) => a.rank - b.rank);
    await ServiceStorage.set(C.STORAGE.CRYPTOS, dataSource);
    return (dataSource);
  },

  async favorites() {
    return await ServiceStorage.get(C.STORAGE.FAVORITES) || C.DEFAULT_FAVORITES;
  },

  async fav(id) {
    const favs = await ServiceStorage.get(C.STORAGE.FAVORITES) || [];
    favs.push(id);
    await ServiceStorage.set(C.STORAGE.FAVORITES, favs);
    return favs;
  },
};
