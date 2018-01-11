import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  CONTRAST, PRIMARY, WHITE, FONT, UNIT, OFFSET,
} = THEME;

export default StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    paddingVertical: UNIT,
    shadowColor: PRIMARY,
    shadowOffset: { height: UNIT * -1, width: 0 },
    shadowOpacity: 1,
    shadowRadius: UNIT / 2,
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
    marginRight: UNIT,
  },

  trend: {
    fontSize: FONT.SIZE.SMALL,
    fontWeight: FONT.WEIGHT.BOLD,
    color: CONTRAST,
  },

  hodl: {
    fontSize: FONT.SIZE.SMALL,
    color: CONTRAST,
  },

  button: {
    tintColor: WHITE,
  },
});
