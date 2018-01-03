import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { CONTRAST, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: UNIT * 0.1,
    marginRight: UNIT * 0.1,
    height: '100%',
  },

  value: {
    minHeight: '5%',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderTopLeftRadius: UNIT * 0.5,
    borderTopRightRadius: UNIT * 0.5,
  },

  highlight: {
    backgroundColor: CONTRAST,
  },
});
