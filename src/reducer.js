import {
  ADD_ALERT,
  REMOVE_ALERT,
  ACTIVE_FAVORITE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SAVE_CURRENCIES,
  SNAPSHOTS,
  UPDATE_PRICES,
} from './actions';
import { C } from './config';

const initialState = {
  alerts: [
    { currency: 'BTC', low: 3000, high: 4000 },
    { currency: 'BTC', low: 3500, high: 3750 },
    { currency: 'LTC', low: 50, high: 80 },
  ],
  currencies: [],
  favorites: C.DEFAULT_FAVORITES,
  snapshots: {},
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
        alerts: alerts.filter(({ currency, low, high }) => (currency !== alert.currency && low !== alert.low && high !== alert.high)),
      };
    }

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

    default:
      return state;
  }
}
