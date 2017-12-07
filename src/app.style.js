import { StyleSheet } from 'react-native';
import { THEME } from './config';

export default StyleSheet.create({
  header: {
    backgroundColor: THEME.PRIMARY,
    elevation: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },

  title: {
    alignSelf: 'center',
  },
});
