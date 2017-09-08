import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    width: null,
    height: null,
    backgroundColor: THEME.PRIMARY,
  },

  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: THEME.CONTRAST,
  },

  name: {
    color: THEME.WHITE,
    marginTop: THEME.FONT_SIZE_EXTRA_LARGE * -2,
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE,
    fontWeight: 'bold',
  },

  version: {
    fontSize: THEME.FONT_SIZE_NORMAL,
  },

  authors: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    padding: THEME.OFFSET,
  },

  author: {
    color: THEME.WHITE,
    fontWeight: 'bold',
  },
});
