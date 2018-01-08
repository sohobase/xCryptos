import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const {
  CONTRAST, FONT, WHITE,
} = THEME;

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  caption: {
    fontSize: FONT.SIZE.SMALL,
    color: CONTRAST,
  },

  hodl: {
    fontSize: FONT.SIZE.DEFAULT,
    fontWeight: FONT.WEIGHT.BOLD,
    color: WHITE,
  },

});
