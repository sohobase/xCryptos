import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { UNIT } = THEME;
const IMAGE_SIZE = UNIT * 3.2;

export default StyleSheet.create({
  container: {
    paddingVertical: UNIT / 2,
    paddingHorizontal: UNIT,
  },

  active: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
  },

  coin: {
    flex: 1,
  },

  symbol: {
    color: THEME.WHITE,
    fontSize: THEME.FONT.SIZE.LARGE,
    lineHeight: THEME.FONT.SIZE.LARGE,
  },

  text: {
    color: THEME.CONTRAST,
    fontSize: THEME.FONT.SIZE.SMALL,
  },

  operation: {
    opacity: 0.75,
    transform: [{ scale: 0.75 }],
  },

  hint: {
    opacity: 0.75,
  },

  values: {
    flex: 0,
    minWidth: '30%',
    alignItems: 'flex-end',
  },

  value: {
    color: THEME.WHITE,
    fontSize: THEME.FONT.SIZE.LARGE,
  },

  thumb: {
    padding: UNIT / 2,
    marginRight: UNIT,
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

  alert: {
    position: 'absolute',
    bottom: UNIT / 3,
    right: 0,
    tintColor: THEME.WHITE,
    width: THEME.FONT.SIZE.LARGE,
    height: THEME.FONT.SIZE.LARGE,
  },

  option: {
    alignSelf: 'center',
    tintColor: THEME.WHITE,
    marginTop: UNIT * 1.32,
  },
});
