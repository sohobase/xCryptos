import { ACTIVE_FAVORITE, ADD_FAVORITE, INIT_FAVORITES, REMOVE_FAVORITE, SAVE_CURRENCIES, UPDATE_FAVORITES } from './actions';

const initialState = {
  currencies: [],
  favorites: [],
};

export default function crypto(state = initialState, action) {
  switch (action.type) {
    case SAVE_CURRENCIES:
      return { ...state, currencies: action.currencies };

    case ACTIVE_FAVORITE: {
      const { favorites } = state;
      const { favorite } = action;
      return { ...state, favorites: favorites.map(item => ({ ...item, active: favorite.symbol === item.symbol })) };
    }
    case ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, action.favorite] };
    case INIT_FAVORITES:
      return { ...state, favorites: action.favorites };
    case REMOVE_FAVORITE: {
      const { favorites } = state;
      const { favorite } = action;
      return { ...state, favorites: favorites.filter(({ symbol }) => (symbol !== favorite.symbol)) };
    }
    case UPDATE_FAVORITES: {
      const { favorites } = state;
      const { currencies } = action;
      return {
        ...state,
        favorites: favorites.map((item) => {
          const { usd } = currencies.find(({ symbol }) => symbol === item.symbol) || {};
          return { ...item, usd };
        }),
      };
    }

    default:
      return state;
  }
}
