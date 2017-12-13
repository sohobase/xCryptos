import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const {
  CONTRAST, PRIMARY, WHITE, OFFSET, UNIT,
} = THEME;

export default StyleSheet.create({
  container: {
    width: null,
    height: null,
    backgroundColor: PRIMARY,
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
    color: CONTRAST,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: UNIT / 4,
    marginTop: UNIT / 4,
    fontSize: THEME.FONT_SIZE_SMALL,
  },

  name: {
    color: WHITE,
    margin: UNIT * 0.5,
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },

  brand: {
    height: UNIT,
    resizeMode: 'contain',
    marginBottom: UNIT / 2,
  },

  copyright: {
    zIndex: 1,
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    padding: OFFSET * 2,
  },
});
