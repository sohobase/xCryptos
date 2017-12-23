import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  CONTRAST, COLOR_LOW, COLOR_HIGH, FONT_SIZE_SMALL, FONT_WEIGHT_BOLD, UNIT, WHITE,
} = THEME;

export default StyleSheet.create({
  label: {
    color: CONTRAST,
    fontSize: FONT_SIZE_SMALL,
  },

  down: {
    backgroundColor: COLOR_LOW,
  },

  up: {
    backgroundColor: COLOR_HIGH,
  },

  value: {
    fontWeight: FONT_WEIGHT_BOLD,
    color: WHITE,
  },

  icon: {
    marginRight: UNIT / 2,
    height: FONT_SIZE_SMALL,
    width: FONT_SIZE_SMALL,
    tintColor: WHITE,
    resizeMode: 'contain',
  },
});
