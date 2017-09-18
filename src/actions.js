export const ADD_ALERT = '@xCryptos/ADD_ALERT';
export const addAlertAction = alert => ({
  type: ADD_ALERT,
  alert,
});
export const REMOVE_ALERT = '@xCryptos/REMOVE_ALERT';
export const removeAlertAction = alert => ({
  type: REMOVE_ALERT,
  alert,
});
export const SAVE_ALERTS = '@xCryptos/SAVE_ALERTS';
export const saveAlertsAction = alerts => ({
  type: SAVE_ALERTS,
  alerts,
});

export const SAVE_CURRENCIES = '@xCryptos/SAVE_CURRENCIES';
export const saveCurrenciesAction = currencies => ({
  type: SAVE_CURRENCIES,
  currencies,
});

export const ADD_FAVORITE = '@xCryptos/ADD_FAVORITE';
export const addFavoriteAction = favorite => ({
  type: ADD_FAVORITE,
  favorite,
});
export const ACTIVE_FAVORITE = '@xCryptos/ACTIVE_FAVORITE';
export const activeFavoriteAction = favorite => ({
  type: ACTIVE_FAVORITE,
  favorite,
});
export const REMOVE_FAVORITE = '@xCryptos/REMOVE_FAVORITE';
export const removeFavoriteAction = favorite => ({
  type: REMOVE_FAVORITE,
  favorite,
});

export const UPDATE_PRICES = '@xCryptos/UPDATE_PRICES';
export const updatePricesAction = prices => ({
  type: UPDATE_PRICES,
  prices,
});

export const SNAPSHOTS = '@xCryptos/SNAPSHOTS';
export const snapshotsAction = (currency, symbol) => ({
  type: SNAPSHOTS,
  currency,
  symbol,
});

export const ADD_TOKEN = '@xCryptos/ADD_TOKEN';
export const addTokenAction = token => ({
  type: ADD_TOKEN,
  token,
});
