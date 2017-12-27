import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { OFFSET } = THEME;

export default StyleSheet.create({
  input: {
    color: THEME.FONT_PRIMARY_COLOR,
    textAlign: 'center',
    fontSize: THEME.FONT.SIZE.EXTRA_LARGE * 2,
    fontWeight: THEME.FONT.WEIGHT.LIGHT,
    marginBottom: OFFSET,
  },
});
