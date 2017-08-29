import { C } from '../config';
import ServiceStorage from './storage';

const fav = async(favorite, added = false) => {
  const favs = await ServiceStorage.get(C.STORAGE.FAVORITES) || C.DEFAULT_FAVORITES;
  if (!added) {
    favs.push(favorite);
  } else {
    const index = favs.findIndex(i => i.symbol === favorite.symbol);
    favs.splice(index, 1);
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

  add(favorite) {
    return fav(favorite);
  },

  remove(favorite) {
    return fav(favorite, true);
  },
};
