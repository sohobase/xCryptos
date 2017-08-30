import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.PRIMARY,
    paddingVertical: 4,
  },
  active: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
  },
  text: {
    color: 'white',
  },
  currency: {
    flex: 1,
    paddingLeft: 12,
  },
  small: {
    opacity: 0.75,
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  values: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 20,
  },
});
