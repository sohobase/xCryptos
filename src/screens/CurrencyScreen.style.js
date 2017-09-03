import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    backgroundColor: THEME.PRIMARY,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: THEME.OFFSET,
  },

  currency: {
    flex: 1,
  },

  price: {
    fontSize: THEME.UNIT * 2,
    color: THEME.WHITE,
  },

  text: {
    color: THEME.CONTRAST,
  },
});
