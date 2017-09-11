import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const ICON_SIZE = THEME.UNIT * 2.4;

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    minHeight: '50%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    // height: '60%',
  },

  small: {
    fontSize: THEME.FONT_SIZE_SMALL,
  },

  label: {
    color: THEME.CONTRAST,
  },

  current: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  currentSymbol: {
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE,
    marginTop: THEME.UNIT,
  },

  currentPrice: {
    fontSize: THEME.UNIT * 5.6,
    fontWeight: THEME.FONT_WEIGHT_LIGHT,
    color: THEME.WHITE,
  },

  currentIcon: {
    marginTop: THEME.UNIT,
    width: THEME.FONT_SIZE_EXTRA_LARGE,
    height: THEME.FONT_SIZE_EXTRA_LARGE,
  },

  chip: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
    paddingTop: THEME.UNIT * 0.5,
    paddingBottom: THEME.UNIT * 0.5,
    paddingLeft: THEME.UNIT,
    paddingRight: THEME.UNIT,
    borderRadius: THEME.UNIT * 2,
  },

  low: {
    backgroundColor: 'rgba(255,0,0,0.25)',
  },

  high: {
    backgroundColor: 'rgba(0,255,0,0.25)',
  },

  historyPrice: {
    fontWeight: THEME.FONT_WEIGHT_BOLD,
    color: THEME.WHITE,
  },

});
