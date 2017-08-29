export const SAVE_CURRENCIES = '@Crypto/SAVE_CURRENCIES';
export const save_currencies = currencies => ({
  type: SAVE_CURRENCIES,
  currencies,
});

export const SAVE_FAVORITES = '@Crypto/SAVE_FAVORITES';
export const save_favorites = favorites => ({
  type: SAVE_FAVORITES,
  favorites,
});
