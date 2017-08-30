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
    backgroundColor: THEME.BACKGROUND_DARK_HIGHLIGHT,
  },
  text: {
    color: 'white',
  },
  currency: {
    flex: 1,
  },
  small: {
    opacity: 0.75,
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  values: {
    paddingLeft: 12,
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 20,
  },
});
