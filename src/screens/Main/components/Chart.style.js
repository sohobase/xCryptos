import { Platform, StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  COLOR, FONT, OFFSET, UNIT,
} = THEME;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: OFFSET,
    marginBottom: Platform.OS === 'ios' ? UNIT : 0,
  },

  prices: {
    minHeight: UNIT * 2.6,
  },

  reverse: {
    flexDirection: 'row-reverse',
  },

  space: {
    flex: 1,
  },

  bars: {
    height: UNIT * 9.6,
    width: '100%',
    marginVertical: UNIT / 2,
  },

  bar: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: UNIT * 0.1,
    marginRight: UNIT * 0.1,
    height: '100%',
  },

  value: {
    minHeight: UNIT,
    borderRadius: UNIT / 2,
  },

  option: {
    backgroundColor: 'transparent',
  },

  active: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
  },

  caption: {
    backgroundColor: 'transparent',
    color: COLOR.CHART,
    fontSize: FONT.SIZE.SMALL,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  captionActive: {
    color: THEME.WHITE,
  },
});
