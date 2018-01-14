import * as actions from './actions';
import reducer from './reducer';

const INITIAL_STATE = {
  alerts: [],
  coins: [],
  favorites: [{
    active: true,
    coin: 'BTC',
    hodl: undefined,
    image: 'https://www.cryptocompare.com/media/19633/btc.png',
    name: 'Bitcoin',
    price: 0,
  }, {
    coin: 'ETH',
    hodl: undefined,
    image: 'https://www.cryptocompare.com/media/20646/eth.png',
    name: 'Ethereum',
    price: 0,
  }, {
    coin: 'LTC',
    hodl: undefined,
    image: 'https://www.cryptocompare.com/media/19782/litecoin-logo.png',
    name: 'Litecoin',
    price: 0,
  }],
  settings: { currency: 'USD', language: 'English' },
  snapshots: {},
  token: '',
};

describe('crypto reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  describe('alerts actions', () => {
    const alert = {
      coin: 'BTC',
      currency: 'USD',
      low: 1,
      high: 10
    };
    const alert2 = {
      coin: 'ETH',
      currency: 'USD',
      low: 2,
      high: 5
    };

    it('handles ADD_ALERT', () => {
      const initialState = { alerts: [] };
      const action = { type: actions.ADD_ALERT, alert };
      
      expect(reducer(initialState, action)).toEqual({ alerts: [alert] });
    });

    it('handles REMOVE_ALERT', () => {
      const initialState = { alerts: [alert, alert2] };
      const action = { type: actions.REMOVE_ALERT, alert: alert2 };
      
      expect(reducer(initialState, action)).toEqual({ alerts: [alert] });
    });

    it('handles SAVE_ALERTS', () => {      
      const initialState = { alerts: [alert] };
      const action = { type: actions.SAVE_ALERTS, alerts: [alert2] };
      
      expect(reducer(initialState, action)).toEqual({ alerts: [alert2] });
    });
  }); 

  describe('coins actions', () => {
    const coins = [{
      coin: 'BTC',
      name: 'Bitcoin',
      price: 1337,
      rank: 1,
    }];

    it('handles SAVE_COINS', () => {  
      const initialState = { coins: [] };
      const action = { type: actions.SAVE_COINS, coins };
        
      expect(reducer(initialState, action)).toEqual({ coins });
    });
  });

  describe('favorites actions', () => {
    const favorite = {
      active: true,
      coin: 'BTC',
      hodl: 37,
      name: 'Bitcoin',
      price: 1337,
    };
    const notFavorite = {
      active: false,
      coin: 'ETH',
      hodl: 59,
      name: 'Ethereum',
      price: 777,
    };

    it('handles ACTIVE_FAVORITE', () => {  
      const initialState = { favorites: [notFavorite] };
      const action = { type: actions.ACTIVE_FAVORITE, favorite: notFavorite };
      const expectedState = { favorites: [{ ...notFavorite, active: true}] };
      
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('handles ADD_FAVORITE', () => {  
      const initialState = { favorites: [] };
      const action = { type: actions.ADD_FAVORITE, favorite };
      
      expect(reducer(initialState, action)).toEqual({ favorites: [favorite] });
    });

    it('handles UPDATE_FAVORITE', () => {  
      const initialState = { favorites: [favorite, notFavorite] };
      const updatedFavorite = { ...favorite, price: 20000 };
      const action = { type: actions.UPDATE_FAVORITE, favorite: updatedFavorite };
      
      expect(reducer(initialState, action)).toEqual({ favorites: [updatedFavorite, notFavorite] });
    });

    it('handles REMOVE_FAVORITE', () => {  
      const initialState = { favorites: [favorite, notFavorite] };
      const action = { type: actions.REMOVE_FAVORITE, favorite: notFavorite };
      
      expect(reducer(initialState, action)).toEqual({ favorites: [favorite] });
    });

    it('handles UPDATE_PRICES', () => {  
      const initialState = { favorites: [favorite, notFavorite] };
      const prices = { BTC: 100, ETH: 200 };
      const action = { type: actions.UPDATE_PRICES, favorite: initialState, prices };
      const expectedState = [{ ...favorite, price: 100 }, { ...notFavorite, price: 200 }];
      
      expect(reducer(initialState, action)).toEqual({ favorites: expectedState });
    });
  });

  describe('settings actions', () => {
    it('handles UPDATE_SETTINGS', () => {  
      const initialState = { settings: { currency: 'USD', language: 'English' } };
      const action = { type: actions.UPDATE_SETTINGS, settings: { currency: 'EUR' } };
      const expectedState = { settings: { currency: 'EUR', language: 'English' } };
      
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('snapshots actions', () => {
    it('handles SNAPSHOTS', () => {
      const initalState = { snapshots: {} };
      const data = { price: 1337 };
      const coin = 'BTC';
      const action = { type: actions.SNAPSHOTS, data, coin };
      const expectedState = { snapshots: { [coin]: data } };
      
      expect(reducer({}, action)).toEqual(expectedState);
    });
  });

  describe('token actions', () => {
    it('handles ADD_TOKEN', () => {  
      const token = 'someRandomToken';
      const action = { type: actions.ADD_TOKEN, token };
      
      expect(reducer({}, action)).toEqual({ token });
    });
  });
});
