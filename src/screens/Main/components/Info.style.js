import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  CONTRAST, WHITE, FONT, UNIT, OFFSET,
} = THEME;
const IMAGE_SIZE = UNIT * 3.2;

export default StyleSheet.create({
  container: {
    flex: 0,
    minHeight: '25%',
    width: '100%',
    marginVertical: UNIT,
  },

  coin: {
    flex: 1,
    paddingHorizontal: OFFSET,
  },

  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
  },

  imageWrap: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
    width: IMAGE_SIZE * 1.2,
    height: IMAGE_SIZE * 1.2,
    borderRadius: (IMAGE_SIZE * 1.2) / 2,
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
