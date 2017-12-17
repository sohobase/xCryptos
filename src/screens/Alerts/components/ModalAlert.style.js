import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

export default StyleSheet.create({

  content: {
    paddingHorizontal: THEME.OFFSET,
  },

  symbol: {
    color: THEME.COLOR_SECONDARY,
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE,
    fontWeight: THEME.FONT_WEIGHT_LIGHT,
    marginLeft: THEME.UNIT * 2,
  },

  price: {
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE * 2,
    fontWeight: THEME.FONT_WEIGHT_LIGHT,
  },

  chip: {
    backgroundColor: THEME.BACKGROUND_DARK_HIGHLIGHT,
  },

  chipCaption: {
    color: THEME.COLOR_SECONDARY,
    fontSize: THEME.FONT_SIZE_SMALL,
  },

  fieldset: {
    width: '50%',
    marginBottom: THEME.OFFSET,
  },

  fieldReset: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },

  labelRight: {
    alignSelf: 'flex-end',
  },

  input: {
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE,
    color: THEME.FONT_PRIMARY_COLOR,
    width: '100%',
  },

  inputRight: {
    textAlign: 'right',
  },

  modalButton: {
    marginBottom: THEME.OFFSET,
  },
});
