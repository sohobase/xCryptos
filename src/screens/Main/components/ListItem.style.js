import Color from 'color';
import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  COLOR, FONT, OFFSET, UNIT,
} = THEME;
const IMAGE_SIZE = UNIT * 3.2;
const BULLET_SIZE = UNIT;

export default StyleSheet.create({
  active: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
  },

  alert: {
    position: 'absolute',
    bottom: -UNIT / 4,
    right: -UNIT / 2,
    tintColor: THEME.WHITE,
    width: FONT.SIZE.LARGE,
    height: FONT.SIZE.LARGE,
  },

  bullet: {
    borderRadius: BULLET_SIZE / 2,
    height: BULLET_SIZE,
    position: 'absolute',
    width: BULLET_SIZE,
    zIndex: 1,
  },

  container: {
    paddingVertical: UNIT / 2,
    paddingHorizontal: OFFSET,
    backgroundColor: 'transparent',
  },

  green: {
    backgroundColor: Color(COLOR.GREEN).alpha(1),
  },

  hint: {
    opacity: 0.75,
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

  info: {
    flex: 1,
  },

  operation: {
    opacity: 0.75,
    transform: [{ scale: 0.75 }],
  },

  option: {
    alignSelf: 'center',
    tintColor: THEME.WHITE,
    marginTop: UNIT * 1.32,
  },

  price: {
    flex: 0,
    minWidth: '30%',
    maxWidth: '50%',
    alignItems: 'flex-end',
  },

  red: {
    backgroundColor: Color(COLOR.RED).alpha(1),
  },

  symbol: {
    color: THEME.WHITE,
    fontSize: FONT.SIZE.LARGE,
    marginRight: UNIT / 4,
  },

  text: {
    color: THEME.CONTRAST,
    fontSize: FONT.SIZE.SMALL,
  },

  thumb: {
    marginVertical: UNIT / 2,
    marginRight: UNIT,
  },

  value: {
    color: THEME.WHITE,
    fontSize: FONT.SIZE.LARGE,
  },
});
