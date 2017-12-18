import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

export default StyleSheet.create({
  searchBar: {
    backgroundColor: THEME.PRIMARY,
    borderTopWidth: 0,
    elevation: 8,
  },

  input: {
    backgroundColor: THEME.WHITE,
    color: THEME.BLACK,
  },

  list: {
    backgroundColor: THEME.WHITE,
  },
});
