import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },

  bars: {
    height: UNIT * 10.4,
    width: '100%',
  },

  bar: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: UNIT * 0.1,
    marginRight: UNIT * 0.1,
    height: '100%',
  },

  value: {
    minHeight: '5%',
    borderTopLeftRadius: UNIT * 0.15,
    borderTopRightRadius: UNIT * 0.15,
  },

  option: {
    marginBottom: UNIT,
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
