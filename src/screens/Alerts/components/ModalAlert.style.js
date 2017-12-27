import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { OFFSET, UNIT } = THEME;

export default StyleSheet.create({

  content: {
    paddingHorizontal: OFFSET,
    paddingVertical: UNIT,
  },

  symbol: {
    color: THEME.COLOR_SECONDARY,
    fontSize: THEME.FONT.SIZE.EXTRA_LARGE,
    fontWeight: THEME.FONT.WEIGHT.LIGHT,
    marginLeft: UNIT * 2,
  },

  price: {
    fontSize: THEME.FONT.SIZE.EXTRA_LARGE * 2,
    fontWeight: THEME.FONT.WEIGHT.LIGHT,
  },

  input: {
    width: '50%',
    fontSize: THEME.FONT.SIZE.EXTRA_LARGE,
    color: THEME.FONT_PRIMARY_COLOR,
  },

  inputRight: {
    textAlign: 'right',
  },

  button: {
    paddingVertical: OFFSET,
  },
});
