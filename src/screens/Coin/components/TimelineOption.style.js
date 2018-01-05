import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    marginBottom: UNIT,
    backgroundColor: 'transparent',
  },

  active: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
  },

  caption: {
    backgroundColor: 'transparent',
    color: COLOR.CHART,
    fontSize: THEME.FONT.SIZE.SMALL,
    fontWeight: THEME.FONT.WEIGHT.BOLD,
  },

  captionActive: {
    color: THEME.WHITE,
  },
});
