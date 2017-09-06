import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    width: '33%',
    height: '25%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE,
  },
});
