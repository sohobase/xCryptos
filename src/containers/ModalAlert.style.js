import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { FONT, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  content: {
    paddingHorizontal: OFFSET,
    paddingVertical: UNIT,
  },

  price: {
    fontSize: FONT.SIZE.EXTRA_LARGE * 2,
    fontWeight: FONT.WEIGHT.LIGHT,
  },

  fieldset: {
    width: '50%',
  },

  alignRight: {
    alignItems: 'flex-end',
  },

  label: {
    fontSize: FONT.SIZE.NORMAL,
    color: THEME.COLOR_SECONDARY,
  },

  percent: {
    fontSize: FONT.SIZE.SMALL,
  },

  input: {
    fontSize: FONT.SIZE.EXTRA_LARGE,
    color: THEME.FONT_PRIMARY_COLOR,
  },

  inputRight: {
    textAlign: 'right',
  },

  button: {
    paddingVertical: OFFSET,
  },
});
