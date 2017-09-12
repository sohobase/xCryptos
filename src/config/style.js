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

  BULLET: {
    width: THEME.UNIT * 0.65,
    height: THEME.UNIT * 0.65,
    borderRadius: THEME.UNIT * 0.65,
    backgroundColor: THEME.CONTRAST,
  },

  CHIP: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
    paddingTop: THEME.UNIT * 0.5,
    paddingBottom: THEME.UNIT * 0.5,
    paddingLeft: THEME.UNIT,
    paddingRight: THEME.UNIT,
    borderRadius: THEME.UNIT * 2,
  },

  CENTERED: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
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
    lineHeight: THEME.FONT_SIZE_EXTRA_LARGE,
  },
});
