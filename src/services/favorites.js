import { C } from '../config';
import ServiceStorage from './storage';

const fav = async(symbol, added = false) => {
  const favs = await ServiceStorage.get(C.STORAGE.FAVORITES) || C.DEFAULT_FAVORITES;
  if (!added) {
    favs.push(symbol);
  } else {
    favs.splice(favs.indexOf(symbol), 1);
  }
  await ServiceStorage.set(C.STORAGE.FAVORITES, favs);
  return favs;
};

export default {

  async list() {
    const currencies = await ServiceStorage.get(C.STORAGE.CRYPTOS);
    const favorites = await ServiceStorage.get(C.STORAGE.FAVORITES);

    return currencies.filter(({ symbol }) => favorites.indexOf(symbol) > -1);
  },

  async keys() {
    const keys = await ServiceStorage.get(C.STORAGE.FAVORITES);
    return keys || C.DEFAULT_FAVORITES;
  },

  async add(symbol) {
    await fav(symbol);
  },

  async remove(symbol) {
    await fav(symbol, true);
  },
};
