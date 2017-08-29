import { SAVE_CURRENCIES, SAVE_FAVORITES } from './actions';

const initialState = {
  currencies: [],
  favorites: [],
};

export default function crypto(state = initialState, action) {
  switch (action.type) {
    case SAVE_CURRENCIES:
      return { ...state, currencies: action.currencies };

    case SAVE_FAVORITES:
      return { ...state, favorites: action.favorites };

    default:
      return state;
  }
}
