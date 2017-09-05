import { StyleSheet } from 'react-native';
import THEME from './theme';

export default StyleSheet.create({
  SCREEN: {
    flex: 1,
  },
  ROW: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  DRAWER_ICON: {

  },
  CURRENCY_ICON: {
    width: THEME.UNIT * 3.6,
    height: THEME.UNIT * 3.6,
    marginRight: THEME.OFFSET,
  },
  CURRENCY_SYMBOL: {
    color: THEME.WHITE,
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE,
    fontWeight: 'bold',
  },
});
