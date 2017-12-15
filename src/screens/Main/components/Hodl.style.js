import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { UNIT, OFFSET } = THEME;

export default StyleSheet.create({
  container: {
    paddingHorizontal: OFFSET,
  },

  logo: {
    width: UNIT * 3.6,
    resizeMode: 'contain',
    marginRight: UNIT,
  },

  amount: {
    color: THEME.WHITE,
    fontSize: THEME.FONT_SIZE_NORMAL,
  },
});
