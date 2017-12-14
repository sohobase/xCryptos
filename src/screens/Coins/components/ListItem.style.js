import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

export default StyleSheet.create({
  currency: {
    flex: 1,
  },
  name: {
    fontSize: THEME.FONT_SIZE_NORMAL,
  },
  symbol: {
    color: THEME.COLOR_SECONDARY,
    fontSize: THEME.FONT_SIZE_SMALL,
  },
});
