import { C } from '../config';
import ServiceStorage from './storage';

const STORAGE = C.STORAGE.FAVORITES;

const fav = async(favorite, added = false) => {
  const favs = await ServiceStorage.get(STORAGE);
  if (!added) {
    favs.push(favorite);
  } else {
    const index = favs.findIndex(i => i.symbol === favorite.symbol);
    favs.splice(index, 1);
  }
  await ServiceStorage.set(STORAGE, favs);
  return favs;
};

export default {
  async list() {
    let favorites = await ServiceStorage.get(STORAGE);
    if (!favorites) {
      favorites = C.DEFAULT_FAVORITES;
      await ServiceStorage.set(STORAGE, favorites);
    }

    return favorites;
  },

  async update(currencies) {
    const favorites = await ServiceStorage.get(STORAGE);

    favorites.forEach((favorite) => {
      const currency = currencies.find(({ symbol }) => symbol === favorite.symbol);
      favorite.usd = currency.usd;
    });
    await ServiceStorage.set(STORAGE, favorites);

    return favorites;
  },

  async active({ symbol }) {
    const storageFavorites = await ServiceStorage.get(STORAGE);
    const favorites = storageFavorites.map(favorite => ({ ...favorite, active: favorite.symbol === symbol }));
    await ServiceStorage.set(STORAGE, favorites);

    return favorites;
  },

  async keys() {
    const keys = await ServiceStorage.get(STORAGE);
    return keys || C.DEFAULT_FAVORITES;
  },

  add(favorite) {
    return fav(favorite);
  },

  remove(favorite) {
    return fav(favorite, true);
  },
};
