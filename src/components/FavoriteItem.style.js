import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const THUMBNAIL_SIZE = THEME.UNIT * 3.6;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.PRIMARY,
    paddingVertical: 4,
    paddingLeft: 12,
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'flex-end',
  },
  value: {
    color: THEME.WHITE,
    fontSize: THEME.FONT_SIZE_LARGE,
  },
  blink: {
    width: THEME.UNIT * 0.2,
    height: '100%',
    marginLeft: THEME.UNIT * 0.3,
    backgroundColor: THEME.CONTRAST,
  },

  thumb: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
    marginRight: THEME.OFFSET,
    borderRadius: THUMBNAIL_SIZE / 2,
  },

  image: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
  },

  alert: {
    position: 'absolute',
    bottom: -(THEME.UNIT / 2),
    right: -(THEME.UNIT / 2),
    tintColor: THEME.WHITE,
    width: THEME.FONT_SIZE_LARGE,
    height: THEME.FONT_SIZE_LARGE,
  },
});
