import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    width: null,
    height: null,
    backgroundColor: THEME.PRIMARY,
  },

  background: {
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  info: {
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: THEME.CONTRAST,
    backgroundColor: 'transparent',
  },

  name: {
    color: THEME.WHITE,
    margin: THEME.UNIT * 0.5,
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },

  version: {
    fontSize: THEME.FONT_SIZE_SMALL,
  },

  authors: {
    zIndex: 1,
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
    backgroundColor: 'transparent',
  },
});
