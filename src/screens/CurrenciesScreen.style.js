import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  searchContainer: {
    backgroundColor: THEME.PRIMARY,
    borderTopWidth: 0,
  },
  searchInput: {
    backgroundColor: THEME.WHITE,
    color: THEME.BLACK,
  },
});
