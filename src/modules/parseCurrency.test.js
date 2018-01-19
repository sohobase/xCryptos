import parseCurrency from './parseCurrency';

const AMOUNT = 122.35483432434;

describe('.parseCurrency', () => {
  describe('when value is bigger than 1000', function () {
    it('returns the value formatted with no decimals', () => {
      expect(parseCurrency(12345.12345)).toEqual('12,345');
    });
  });

  describe('when value is smaller than 1000', function () {
    it('returns the value with two decimals', function () {
      expect(parseCurrency(123.12345)).toEqual('123.12');
    });
  });
});
