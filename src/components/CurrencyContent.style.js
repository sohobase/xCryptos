import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  prices: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  chart: {
    height: THEME.UNIT * 9.6,
  },


  bullet: {
    marginRight: THEME.UNIT * 0.35,
  },

  bulletActive: {
    backgroundColor: THEME.ACCENT,
  },

  option: {
    padding: THEME.UNIT * 0.75,
  },

  optionCaption: {
    fontWeight: THEME.FONT_WEIGHT_BOLD,
    opacity: 0.75,
  },

  optionCaptionActive: {
    color: THEME.WHITE,
    opacity: 1,
  },

  small: {
    fontSize: THEME.FONT_SIZE_SMALL,
  },

  label: {
    color: THEME.CONTRAST,
  },

  chipSymbol: {
    position: 'absolute',
    right: THEME.UNIT * -4,
    top: THEME.UNIT,
  },

  bold: {
    fontWeight: THEME.FONT_WEIGHT_BOLD,
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

  low: {
    backgroundColor: THEME.COLOR_LOW,
  },

  high: {
    backgroundColor: THEME.COLOR_HIGH,
  },

  historyPrice: {
    fontWeight: THEME.FONT_WEIGHT_BOLD,
    color: THEME.WHITE,
  },

});
