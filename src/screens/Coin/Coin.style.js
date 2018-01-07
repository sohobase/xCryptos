import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { CONTRAST, FONT, OFFSET, WHITE } = THEME;

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  chip: {
    margin: OFFSET,
    paddingHorizontal: OFFSET,
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
