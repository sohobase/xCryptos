import { C } from '../config';
import ServiceStorage from './storage';

const fav = async(favorite, added = false) => {
  const favs = await ServiceStorage.get(C.STORAGE.FAVORITES);
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
    let favorites = await ServiceStorage.get(C.STORAGE.FAVORITES);
    console.log('favorites', favorites);
    if (!favorites) {
      favorites = C.DEFAULT_FAVORITES;
      await ServiceStorage.set(C.STORAGE.FAVORITES, favorites);
    }

    return favorites;
  },

  async update(currencies) {
    const favorites = await ServiceStorage.get(C.STORAGE.FAVORITES);

    favorites.forEach((favorite) => {
      const currency = currencies.find(({ symbol }) => symbol === favorite.symbol);
      favorite.usd = currency.usd;
    });
    await ServiceStorage.set(C.STORAGE.FAVORITES, favorites);

    return favorites;
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
