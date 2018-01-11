import Color from 'color';
import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT, OFFSET, UNIT } = THEME;
const IMAGE_SIZE = UNIT * 3.2;

export default StyleSheet.create({
  container: {
    paddingVertical: UNIT / 2,
    paddingHorizontal: OFFSET,
    backgroundColor: 'transparent',
  },

  active: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
  },

  info: {
    flex: 1,
  },

  price: {
    flex: 0,
    minWidth: '30%',
    maxWidth: '50%',
    alignItems: 'flex-end',
  },

  symbol: {
    color: THEME.WHITE,
    fontSize: FONT.SIZE.LARGE,
    lineHeight: FONT.SIZE.LARGE,
  },

  text: {
    color: THEME.CONTRAST,
    fontSize: FONT.SIZE.SMALL,
  },

  operation: {
    opacity: 0.75,
    transform: [{ scale: 0.75 }],
  },

  hint: {
    opacity: 0.75,
  },

  value: {
    color: THEME.WHITE,
    fontSize: FONT.SIZE.LARGE,
  },

  thumb: {
    marginVertical: UNIT / 2,
    marginRight: UNIT,
  },

  bullet: {
    borderRadius: UNIT / 2,
    height: UNIT,
    position: 'absolute',
    width: UNIT,
    zIndex: 1,
  },

  green: {
    backgroundColor: Color(COLOR.GREEN).alpha(1),
  },

  red: {
    backgroundColor: Color(COLOR.RED).alpha(1),
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
    bottom: -UNIT / 4,
    right: -UNIT / 2,
    tintColor: THEME.WHITE,
    width: FONT.SIZE.LARGE,
    height: FONT.SIZE.LARGE,
  },

  option: {
    alignSelf: 'center',
    tintColor: THEME.WHITE,
    marginTop: UNIT * 1.32,
  },
});
