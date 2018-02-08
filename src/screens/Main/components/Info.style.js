import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  CONTRAST, WHITE, FONT, LAYOUT: { BOTTOM_CONTENT_HEIGHT }, UNIT, OFFSET,
} = THEME;

export default StyleSheet.create({
  button: {
    marginLeft: 0,
    marginRight: 0,
    tintColor: WHITE,
  },

  coin: {
    flex: 1,
  },

  container: {
    paddingVertical: OFFSET,
    height: 0,
    maxHeight: 0,
    overflow: 'hidden',
  },

  visible: {
    height: 'auto',
    maxHeight: BOTTOM_CONTENT_HEIGHT,
  },

  header: {
    marginHorizontal: OFFSET,
    marginBottom: UNIT * 2,
  },

  hodl: {
    fontSize: FONT.SIZE.SMALL,
    color: CONTRAST,
  },

  text: {
    color: WHITE,
    backgroundColor: 'transparent',
  },

  name: {
    fontSize: FONT.SIZE.EXTRA_LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
    marginRight: UNIT / 2,
  },

  trend: {
    fontSize: FONT.SIZE.SMALL,
    fontWeight: FONT.WEIGHT.BOLD,
    color: CONTRAST,
  },
});
