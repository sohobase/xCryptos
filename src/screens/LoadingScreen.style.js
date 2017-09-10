import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    // backgroundColor: THEME.PRIMARY,
  },

  logo: {
    width: THEME.UNIT * 6.4,
    height: THEME.UNIT * 6.4,
  },

  version: {
    margin: THEME.UNIT,
    fontSize: THEME.FONT_SIZE_SMALL,
  },
});
