import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { OFFSET, UNIT } = THEME;

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

  fieldset: {

  },

  label: {
    color: THEME.COLOR_SECONDARY,
    fontSize: THEME.FONT_SIZE_SMALL,
    marginBottom: UNIT / 2,
  },

  value: {
    color: THEME.FONT_PRIMARY_COLOR,
    fontSize: THEME.FONT_SIZE_DEFAULT,
  },

  disabled: {
    color: THEME.COLOR_SECONDARY,
  },

  sohobase: {
    tintColor: THEME.FONT_PRIMARY_COLOR,
    height: THEME.FONT_SIZE_NORMAL,
    resizeMode: 'contain',
  },

  text: {
    color: THEME.COLOR_SECONDARY,
    fontSize: THEME.FONT_SIZE_SMALL,
    textAlign: 'center',
    maxWidth: '90%',
    marginTop: UNIT / 2,
  },

});
