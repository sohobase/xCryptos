import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { OFFSET, FONT, UNIT } = THEME;

export default StyleSheet.create({
  content: {
    paddingVertical: OFFSET * 2,
    paddingHorizontal: OFFSET,
  },

  form: {
    flex: 1,
    borderBottomColor: THEME.BACKGROUND_DARK_HIGHLIGHT,
    borderBottomWidth: 1,
    borderTopColor: THEME.BACKGROUND_DARK_HIGHLIGHT,
    borderTopWidth: 1,
  },

  brandname: {
    tintColor: THEME.FONT_PRIMARY_COLOR,
    height: FONT.SIZE.LARGE,
    resizeMode: 'contain',
  },

  label: {
    color: THEME.COLOR_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
    marginBottom: UNIT / 2,
  },

  value: {
    color: THEME.FONT_PRIMARY_COLOR,
    fontSize: FONT.SIZE.LARGE,
  },

  caption: {
    flex: 1,
  },

  disabled: {
    color: THEME.COLOR_SECONDARY,
  },

  sohobase: {
    tintColor: THEME.FONT_PRIMARY_COLOR,
    height: FONT.SIZE.NORMAL,
    resizeMode: 'contain',
  },

  text: {
    color: THEME.COLOR_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
    textAlign: 'center',
    maxWidth: '90%',
    marginTop: UNIT / 2,
  },
});
