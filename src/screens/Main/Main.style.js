import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { PRIMARY, OFFSET } = THEME;

export default StyleSheet.create({
  icon: {
    tintColor: 'white',
  },

  list: {
    flex: 1,
    width: '100%',
  },

  short: {
    backgroundColor: PRIMARY,
    paddingBottom: OFFSET,
  },
});
