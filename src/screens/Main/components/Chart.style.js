import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  COLOR, FONT, OFFSET, UNIT,
} = THEME;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: OFFSET,
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
    height: UNIT * 10.4,
    width: '100%',
    marginTop: OFFSET,
    marginBottom: UNIT / 2,
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
