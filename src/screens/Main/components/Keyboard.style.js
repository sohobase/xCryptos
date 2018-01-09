import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { BLACK, WHITE } = THEME;

export default StyleSheet.create({

  container: {
    backgroundColor: WHITE,
    bottom: 0,
    elevation: 10,
    height: '40%',
    position: 'absolute',
    shadowColor: BLACK,
    shadowOffset: { height: -2, width: 0 },
    shadowOpacity: 0.26,
    shadowRadius: 5,
    zIndex: 1,
  },

  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%',
  },

  button: {
    width: '33%',
    height: '25%',
  },

  caption: {
    fontSize: THEME.FONT.SIZE.EXTRA_LARGE,
  },
});
