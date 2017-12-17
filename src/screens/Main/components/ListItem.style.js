import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { UNIT } = THEME;
const THUMBNAIL_SIZE = UNIT * 3.6;

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
    fontSize: THEME.FONT_SIZE_LARGE,
    lineHeight: THEME.FONT_SIZE_LARGE,
  },

  text: {
    color: THEME.CONTRAST,
    fontSize: THEME.FONT_SIZE_SMALL,
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
    fontSize: THEME.FONT_SIZE_LARGE,
  },

  thumb: {
    padding: UNIT / 2,
    marginRight: UNIT,
  },

  image: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    borderRadius: THUMBNAIL_SIZE / 2,
  },

  imageWrap: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
  },

  alert: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    tintColor: THEME.WHITE,
    width: THEME.FONT_SIZE_LARGE,
    height: THEME.FONT_SIZE_LARGE,
  },

  option: {
    alignSelf: 'center',
    tintColor: THEME.WHITE,
    marginTop: UNIT * 1.32,
  },
});
