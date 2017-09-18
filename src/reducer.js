import {
  ADD_ALERT,
  ADD_TOKEN,
  REMOVE_ALERT,
  ACTIVE_FAVORITE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SAVE_ALERTS,
  SAVE_CURRENCIES,
  SNAPSHOTS,
  UPDATE_PRICES,
} from './actions';
import { C } from './config';

const initialState = {
  alerts: [],
  currencies: [],
  favorites: C.DEFAULT_FAVORITES,
  snapshots: {},
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
        alerts: alerts.filter(({ currency, low, high }) => (!(currency === alert.currency && low === alert.low && high === alert.high))),
      };
    }
    case SAVE_ALERTS:
      return { ...state, alerts: [...action.alerts] };

    // -- Currencies
    case SAVE_CURRENCIES:
      return { ...state, currencies: action.currencies };

    // -- Favorites
    case ACTIVE_FAVORITE: {
      const { favorites } = state;
      const { favorite } = action;
      return {
        ...state,
        favorites: favorites.map(item => ({ ...item, active: favorite.symbol === item.symbol })),
      };
    }
    case ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, action.favorite] };
    case REMOVE_FAVORITE: {
      const { favorites } = state;
      const { favorite } = action;
      return {
        ...state,
        favorites: favorites.filter(({ symbol }) => (symbol !== favorite.symbol)),
      };
    }

    // -- Prices
    case UPDATE_PRICES: {
      const { favorites } = state;
      const { prices } = action;
      return {
        ...state,
        favorites: favorites.map(item => ({ ...item, usd: prices[item.symbol] })),
      };
    }

    // -- Snapshots
    case SNAPSHOTS: {
      const { snapshots = {} } = state;
      const { currency, symbol } = action;

      return {
        ...state,
        snapshots: { ...snapshots, [symbol]: currency },
      };
    }

    // -- token
    case ADD_TOKEN:
      return { ...state, token: action.token };

    default:
      return state;
  }
}
