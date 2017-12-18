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
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE,
    fontWeight: THEME.FONT_WEIGHT_LIGHT,
    marginLeft: UNIT * 2,
  },

  price: {
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE * 2,
    fontWeight: THEME.FONT_WEIGHT_LIGHT,
  },

  input: {
    width: '50%',
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE,
    color: THEME.FONT_PRIMARY_COLOR,
  },

  inputRight: {
    textAlign: 'right',
  },

  button: {
    paddingVertical: OFFSET,
  },
});
