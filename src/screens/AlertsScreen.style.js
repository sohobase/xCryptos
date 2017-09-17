import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
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
