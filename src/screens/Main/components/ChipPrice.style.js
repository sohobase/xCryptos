import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  CONTRAST, COLOR, FONT, UNIT, WHITE,
} = THEME;

export default StyleSheet.create({
  down: {
    backgroundColor: COLOR.LOW,
  },

  margin: {
    marginRight: UNIT / 2,
  },

  label: {
    color: CONTRAST,
    fontSize: FONT.SIZE.SMALL,
  },

  up: {
    backgroundColor: COLOR.HIGH,
  },

  value: {
    fontSize: FONT.SIZE.SMALL,
    fontWeight: FONT.WEIGHT.BOLD,
    color: WHITE,
  },
});
