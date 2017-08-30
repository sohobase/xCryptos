import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.PRIMARY,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  active: {
    backgroundColor: THEME.ACCENT,
  },
  text: {
    color: 'white',
  },
  currency: {
    flex: 1,
  },
  name: {
    opacity: 0.75,
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  values: {
    flex: 0,
    marginRight: 12,
    marginLeft: 12,
  },
  value: {
    fontSize: 20,
    textAlign: 'right',
  },
  valueUSD: {
    opacity: 0.75,
  },
});
