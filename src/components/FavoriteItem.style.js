import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { UNIT } = THEME;
const THUMBNAIL_SIZE = UNIT * 3.6;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: UNIT  / 2,
    paddingHorizontal: UNIT,
  },
  active: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
  },
  currency: {
    flex: 1,
  },
  text: {
    color: THEME.CONTRAST,
    fontSize: THEME.FONT_SIZE_SMALL,
  },
  highlight: {
    color: THEME.WHITE,
  },
  values: {
    flex: 1,
    paddingVertical: UNIT  / 4,
    alignItems: 'flex-end',
  },
  value: {
    color: THEME.WHITE,
    fontSize: THEME.FONT_SIZE_LARGE,
  },
  blink: {
    width: UNIT * 0.2,
    height: '100%',
    marginLeft: UNIT * 0.3,
    backgroundColor: THEME.CONTRAST,
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
});
