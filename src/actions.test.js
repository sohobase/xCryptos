import * as actions from './actions';

describe('Alert actions', () => {
  const alert = {
    coin: 'BTC',
    currency: 'USD',
    low: 1,
    high: 10,
    createdAt: 1515920731,
  };
  const alerts = [alert];

  it('.addAlertAction', () => {
    const expectedAction = { type: actions.ADD_ALERT, alert };
    expect(actions.addAlertAction(alert)).toEqual(expectedAction);
  });

  it('.removeAlertAction', () => {
    const expectedAction = { type: actions.REMOVE_ALERT, alert };
    expect(actions.removeAlertAction(alert)).toEqual(expectedAction);
  });

  it('.saveAlertsAction', () => {
    const expectedAction = { type: actions.SAVE_ALERTS, alerts };
    expect(actions.saveAlertsAction(alerts)).toEqual(expectedAction);
  });
});

describe('Coins actions', () => {
  const coins = [{
    coin: 'BTC',
    name: 'Bitcoin',
    price: 1337,
    rank: 1,
  }];

  it('.saveCoinsAction', () => {
    const expectedAction = { type: actions.SAVE_COINS, coins };
    expect(actions.saveCoinsAction(coins)).toEqual(expectedAction);
  });
});

describe('Favorites actions', () => {
  const favorite = {
    active: true,
    coin: 'BTC',
    hodl: 37,
    name: 'Bitcoin',
    price: 1337,
  };

  it('.addFavoriteAction', () => {
    const expectedAction = { type: actions.ADD_FAVORITE, favorite };
    expect(actions.addFavoriteAction(favorite)).toEqual(expectedAction);
  });

  it('.updateFavoriteAction', () => {
    const expectedAction = { type: actions.UPDATE_FAVORITE, favorite };
    expect(actions.updateFavoriteAction(favorite)).toEqual(expectedAction);
  });

  it('.removeFavoriteAction', () => {
    const expectedAction = { type: actions.REMOVE_FAVORITE, favorite };
    expect(actions.removeFavoriteAction(favorite)).toEqual(expectedAction);
  });
});

describe('Prices actions', () => {
  const prices = [{ coin: 'BTC', price: 1337 }, { coin: 'ETC', price: 777 }];

  it('.updatePricesAction', () => {
    const expectedAction = { type: actions.UPDATE_PRICES, prices };
    expect(actions.updatePricesAction(prices)).toEqual(expectedAction);
  });
});

describe('Settings actions', () => {
  const settings = {
    currency: 'USD',
    language: 'ENG',
  };

  it('.updateSettingsAction', () => {
    const expectedAction = { type: actions.UPDATE_SETTINGS, settings };
    expect(actions.updateSettingsAction(settings)).toEqual(expectedAction);
  });
});

describe('Tokens actions', () => {
  const token = 'thisIsSomeRandomToken';

  it('.snapshotsAction', () => {
    const expectedAction = { type: actions.ADD_TOKEN, token };
    expect(actions.addTokenAction(token)).toEqual(expectedAction);
  });
});
