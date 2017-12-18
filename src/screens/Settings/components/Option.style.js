import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

export default StyleSheet.create({
  caption: {
    color: THEME.FONT_PRIMARY_COLOR,
    fontSize: THEME.FONT_SIZE_NORMAL,
  },

  hint: {
    color: THEME.COLOR_SECONDARY,
    fontSize: THEME.FONT_SIZE_SMALL,
  },
});
