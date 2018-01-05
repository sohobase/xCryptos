import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { UNIT } = THEME;

export default StyleSheet.create({
  container: {
    height: UNIT * 10.4,
    width: '100%',
  },

  bar: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: UNIT * 0.1,
    marginRight: UNIT * 0.1,
    height: '100%',
  },

  value: {
    minHeight: '5%',
    borderTopLeftRadius: UNIT * 0.15,
    borderTopRightRadius: UNIT * 0.15,
  },
});
