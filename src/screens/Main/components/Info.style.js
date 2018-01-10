import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  CONTRAST, WHITE, FONT, UNIT, OFFSET,
} = THEME;

export default StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    marginVertical: UNIT,
  },

  coin: {
    flex: 1,
    paddingHorizontal: OFFSET,
  },

  text: {
    color: WHITE,
    backgroundColor: 'transparent',
  },

  name: {
    fontSize: FONT.SIZE.EXTRA_LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  hodl: {
    fontSize: FONT.SIZE.SMALL,
    color: CONTRAST,
  },

  button: {
    tintColor: WHITE,
  },
});
