import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { UNIT } = THEME;

export default StyleSheet.create({
  container: {
    width: UNIT * 6.4,
    height: UNIT * 5.8,
  },

  input: {
    flex: 1,
    color: THEME.WHITE,
    textAlign: 'right',
    height: UNIT * 5.8,
    fontSize: THEME.FONT_SIZE_SMALL,
  },

});
