import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  CONTRAST, COLOR_LOW, COLOR_HIGH, FONT, UNIT, WHITE,
} = THEME;

export default StyleSheet.create({
  label: {
    color: CONTRAST,
    fontSize: FONT.SIZE.SMALL,
  },

  down: {
    backgroundColor: COLOR_LOW,
  },

  up: {
    backgroundColor: COLOR_HIGH,
  },

  value: {
    fontWeight: FONT.WEIGHT.BOLD,
    color: WHITE,
  },

  icon: {
    marginRight: UNIT / 2,
    height: FONT.SIZE.SMALL,
    width: FONT.SIZE.SMALL,
    tintColor: WHITE,
    resizeMode: 'contain',
  },
});
