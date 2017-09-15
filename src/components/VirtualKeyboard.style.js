import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    height: THEME.SECOND_LAYOUT_HEIGHT,
    minHeight: THEME.SECOND_LAYOUT_HEIGHT,
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
});
