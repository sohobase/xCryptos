export const SAVE_CURRENCIES = '@Crypto/SAVE_CURRENCIES';
export const saveCurrenciesAction = currencies => ({
  type: SAVE_CURRENCIES,
  currencies,
});

export const ADD_FAVORITE = '@Crypto/ADD_FAVORITE';
export const addFavoriteAction = favorite => ({
  type: ADD_FAVORITE,
  favorite,
});
export const ACTIVE_FAVORITE = '@Crypto/ACTIVE_FAVORITE';
export const activeFavoriteAction = favorite => ({
  type: ACTIVE_FAVORITE,
  favorite,
});
export const REMOVE_FAVORITE = '@Crypto/REMOVE_FAVORITE';
export const removeFavoriteAction = favorite => ({
  type: REMOVE_FAVORITE,
  favorite,
});
export const UPDATE_PRICES = '@Crypto/UPDATE_PRICES';
export const updatePricesAction = prices => ({
  type: UPDATE_PRICES,
  prices,
});

export const SNAPSHOTS = '@Crypto/SNAPSHOTS';
export const snapshotsAction = (currency, symbol) => ({
  type: SNAPSHOTS,
  currency,
  symbol,
});
