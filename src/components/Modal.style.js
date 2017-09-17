import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    backgroundColor: THEME.MODAL_BACKDROP,
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    marginLeft: THEME.UNIT * 0.1,
    marginRight: THEME.UNIT * 0.1,
  },

  content: {
    backgroundColor: THEME.WHITE,
    borderTopLeftRadius: THEME.UNIT,
    borderTopRightRadius: THEME.UNIT,
    padding: THEME.OFFSET,
  },

  header: {
    marginBottom: THEME.OFFSET,
  },

  title: {
    flex: 1,
    fontSize: THEME.FONT_SIZE_LARGE,
    fontWeight: THEME.FONT_WEIGHT_BOLD,
    textAlign: 'center',
  },

  close: {
    marginLeft: THEME.UNIT * -2.8,
    marginRight: 0,
    opacity: 0.5,
  },
});
