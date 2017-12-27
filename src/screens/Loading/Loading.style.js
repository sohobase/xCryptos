import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { WHITE, FONT, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: THEME.PRIMARY,
  },

  brandname: {
    marginBottom: UNIT * 3.6,
    tintColor: WHITE,
    height: FONT.SIZE.EXTRA_LARGE,
    resizeMode: 'contain',
  },
});
