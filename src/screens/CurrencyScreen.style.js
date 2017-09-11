import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    backgroundColor: THEME.PRIMARY,
  },

  content: {
    // flex: 1,
    // display: 'flex',
    // backgroundColor: 'green',
    // alignContent: 'flex-end',
    // justifyContent: 'flex-end',
  },

  exchanges: {
    flex: 0,
    backgroundColor: THEME.WHITE,
    height: '45%',
    minHeight: '45%',
    maxHeight: '45%',
  },
});
