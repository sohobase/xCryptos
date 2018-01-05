import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  CONTRAST, COLOR, FONT, UNIT, WHITE,
} = THEME;

export default StyleSheet.create({
  down: {
    backgroundColor: COLOR.LOW,
  },

  icon: {
    height: FONT.SIZE.SMALL,
    width: FONT.SIZE.SMALL,
    tintColor: WHITE,
    resizeMode: 'contain',
  },

  margin: {
    marginHorizontal: UNIT / 2,
  },

  label: {
    color: CONTRAST,
    fontSize: FONT.SIZE.SMALL,
  },

  up: {
    backgroundColor: COLOR.HIGH,
  },

  value: {
    fontWeight: FONT.WEIGHT.BOLD,
    color: WHITE,
  },
});
