import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  CONTRAST, COLOR, FONT, UNIT, WHITE,
} = THEME;

export default StyleSheet.create({
  low: {
    backgroundColor: COLOR.RED,
  },

  margin: {
    marginRight: UNIT / 2,
  },

  label: {
    color: CONTRAST,
    fontSize: FONT.SIZE.SMALL,
  },

  high: {
    backgroundColor: COLOR.GREEN,
  },

  value: {
    fontSize: FONT.SIZE.SMALL,
    fontWeight: FONT.WEIGHT.BOLD,
    color: WHITE,
  },
});
