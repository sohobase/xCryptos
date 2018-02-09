import { StyleSheet } from 'react-native';

import { THEME } from '../../config';

const { UNIT } = THEME;

export default StyleSheet.create({
  input: {
    fontSize: THEME.FONT.SIZE.LARGE,
    paddingVertical: UNIT,
    paddingHorizontal: UNIT / 4,
    width: '100%',
  },

  disabled: {
    color: THEME.COLOR_SECONDARY,
  },
});
