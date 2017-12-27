import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { UNIT } = THEME;

export default StyleSheet.create({
  input: {
    fontSize: THEME.FONT.SIZE.LARGE,
    paddingTop: UNIT,
    paddingBottom: UNIT,
    paddingLeft: UNIT / 4,
    paddingRight: UNIT / 4,
    width: '100%',
  },

  disabled: {
    color: THEME.COLOR_SECONDARY,
  },
});
