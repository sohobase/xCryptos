import {
  ADD_ALERT,
  ADD_TOKEN,
  REMOVE_ALERT,
  ADD_FAVORITE,
  UPDATE_FAVORITE,
  REMOVE_FAVORITE,
  SAVE_ALERTS,
  SAVE_COINS,
  UPDATE_SETTINGS,
  UPDATE_PRICES,
} from './actions';
import { C } from './config';

const { DEFAULT: { FAVORITES, SETTINGS } } = C;

const initialState = {
  alerts: [],
  coins: [],
  favorites: FAVORITES,
  settings: SETTINGS,
  token: '',
};

export default function crypto(state = initialState, action) {
  switch (action.type) {
    // -- Alerts
    case ADD_ALERT:
      return { ...state, alerts: [...state.alerts, action.alert] };

    case REMOVE_ALERT: {
      const { alerts } = state;
      const { alert } = action;
      return {
        ...state,
        alerts: alerts.filter(({ coin, low, high }) =>
          (!(coin === alert.coin && low === alert.low && high === alert.high))),
      };
    }

    case SAVE_ALERTS:
      return { ...state, alerts: [...action.alerts] };

    // -- Currencies
    case SAVE_COINS:
      return { ...state, coins: action.coins };

    // -- Favorites
    case ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, action.favorite] };

    case UPDATE_FAVORITE: {
      const { favorites } = state;
      const { favorite } = action;
      return {
        ...state,
        favorites: favorites.map(fav =>
          (fav.coin !== favorite.coin ? fav : { ...fav, ...favorite, total: fav.price * (favorite.hodl || 0) })),
      };
    }

    case REMOVE_FAVORITE: {
      const { favorites } = state;
      const { favorite } = action;
      return {
        ...state,
        favorites: favorites.filter(({ coin }) => (coin !== favorite.coin)),
      };
    }

    // -- Prices
    case UPDATE_PRICES: {
      const { favorites } = state;
      const { prices } = action;
      return {
        ...state,
        favorites: favorites.map(item => ({
          ...item,
          total: prices[item.coin].price * (item.hodl || 0),
          trend: prices[item.coin].trend,
          price: prices[item.coin].price,
        })),
      };
    }

    // -- SETTINGS
    case UPDATE_SETTINGS: {
      const { settings = {} } = state;
      return {
        ...state,
        settings: { ...settings, ...action.settings },
      };
    }

    // -- token
    case ADD_TOKEN:
      return { ...state, token: action.token };

    default:
      return state;
  }
}
