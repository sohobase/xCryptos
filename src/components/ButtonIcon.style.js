import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  icon: {
    width: THEME.UNIT * 2.8,
    height: THEME.UNIT * 2.8,
    marginLeft: THEME.UNIT,
    marginRight: THEME.UNIT,
    resizeMode: 'cover',
  },
});
