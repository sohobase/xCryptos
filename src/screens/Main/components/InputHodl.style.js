import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { UNIT } = THEME;

export default StyleSheet.create({
  input: {
    color: THEME.WHITE,
    height: UNIT * 5.8,
    width: UNIT * 6.4,
    textAlign: 'right',
  },

});
