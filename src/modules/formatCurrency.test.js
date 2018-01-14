import formatCurrency from './formatCurrency';

const AMOUNT = 122.35483432434;

describe('.formatCurrency', () => {
  it('returns the currency formatted', () => {
    expect(formatCurrency(AMOUNT)).toEqual('122.35');
  });

  it('accepts a custom fixed amount', () => {
    expect(formatCurrency(AMOUNT, 4)).toEqual('122.3548');
  });
});
