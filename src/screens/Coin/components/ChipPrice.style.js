import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  CONTRAST, COLOR, FONT, UNIT, WHITE,
} = THEME;

export default StyleSheet.create({
  label: {
    color: CONTRAST,
    fontSize: FONT.SIZE.SMALL,
  },

  down: {
    backgroundColor: COLOR.LOW,
  },

  up: {
    backgroundColor: COLOR.HIGH,
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
