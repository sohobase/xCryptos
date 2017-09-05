import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: THEME.UNIT * 0.1,
    marginRight: THEME.UNIT * 0.1,
    height: '100%',
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
  },

  value: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
});
