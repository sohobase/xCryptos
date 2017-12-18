import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { OFFSET } = THEME;

export default StyleSheet.create({
  input: {
    color: THEME.FONT_PRIMARY_COLOR,
    textAlign: 'center',
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE * 2,
    fontWeight: THEME.FONT_WEIGHT_LIGHT,
    marginBottom: OFFSET,
  },
});
