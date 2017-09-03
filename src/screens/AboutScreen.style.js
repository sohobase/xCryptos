import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    width: null,
    height: null,
    backgroundColor: THEME.PRIMARY,
    resizeMode: 'repeat',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: THEME.WHITE,
    backgroundColor: 'transparent',
  },
  name: {
    marginTop: THEME.FONT_SIZE_LARGE * -2,
    fontSize: THEME.FONT_SIZE_LARGE,
    fontWeight: 'bold',
  },
  version: {
    fontSize: THEME.FONT_SIZE_NORMAL,
  },
  authors: {
    flex: 0,
    fontSize: THEME.FONT_SIZE_SMALL,
    padding: THEME.OFFSET,
  },
});
