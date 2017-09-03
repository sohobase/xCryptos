export const SAVE_CURRENCIES = '@Crypto/SAVE_CURRENCIES';
export const save_currencies = currencies => ({
  type: SAVE_CURRENCIES,
  currencies,
});

export const ADD_FAVORITE = '@Crypto/ADD_FAVORITE';
export const add_favorite = favorite => ({
  type: ADD_FAVORITE,
  favorite,
});
export const ACTIVE_FAVORITE = '@Crypto/ACTIVE_FAVORITE';
export const active_favorite = favorite => ({
  type: ACTIVE_FAVORITE,
  favorite,
});
export const INIT_FAVORITES = '@Crypto/INIT_FAVORITES';
export const init_favorites = favorites => ({
  type: INIT_FAVORITES,
  favorites,
});
export const REMOVE_FAVORITE = '@Crypto/REMOVE_FAVORITE';
export const remove_favorite = favorite => ({
  type: REMOVE_FAVORITE,
  favorite,
});
export const UPDATE_FAVORITES = '@Crypto/UPDATE_FAVORITES';
export const update_favorites = currencies => ({
  type: UPDATE_FAVORITES,
  currencies,
});
