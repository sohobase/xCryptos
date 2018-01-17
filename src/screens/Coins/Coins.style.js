import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

export default StyleSheet.create({
  searchBar: {
    backgroundColor: THEME.WHITE,
    borderTopWidth: 0,
    elevation: 0,
  },

  input: {
    backgroundColor: THEME.WHITE,
    color: THEME.BLACK,
  },

  list: {
    backgroundColor: THEME.WHITE,
  },
});
