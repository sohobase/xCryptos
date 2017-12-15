import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { UNIT } = THEME;
const THUMBNAIL_SIZE = UNIT * 3.6;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: UNIT / 2,
    paddingHorizontal: UNIT,
  },

  active: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
    elevation: 8,
  },

  currency: {
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

  values: {
    flex: 1,
    paddingVertical: UNIT / 4,
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
  },

  imageWrap: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
    borderRadius: THUMBNAIL_SIZE / 2,
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
    marginTop: UNIT * 1.2,
  },
});
