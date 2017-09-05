import { ACTIVE_FAVORITE, ADD_FAVORITE, REMOVE_FAVORITE, SAVE_CURRENCIES, SNAPSHOTS, UPDATE_PRICES } from './actions';
import { C } from './config';

const initialState = {
  currencies: [],
  favorites: C.DEFAULT_FAVORITES,
  snapshots: {},
};

export default function crypto(state = initialState, action) {
  switch (action.type) {
    case SAVE_CURRENCIES:
      return { ...state, currencies: action.currencies };

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
    case UPDATE_PRICES: {
      const { favorites } = state;
      const { prices } = action;
      return {
        ...state,
        favorites: favorites.map(item => ({ ...item, usd: prices[item.symbol] })),
      };
    }

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
