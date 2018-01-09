import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  BLACK, FONT, WHITE, OFFSET,
} = THEME;

export default StyleSheet.create({

  container: {
    backgroundColor: WHITE,
    bottom: OFFSET * -1,
    elevation: 10,
    height: '40%',
    paddingBottom: OFFSET,
    position: 'absolute',
    shadowColor: BLACK,
    shadowOffset: { height: -2, width: 0 },
    shadowOpacity: 0.26,
    shadowRadius: 5,
    width: '100%',
    zIndex: 1,
  },

  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
  },

  button: {
    width: '33%',
    height: '25%',
  },

  caption: {
    fontSize: FONT.SIZE.EXTRA_LARGE,
  },
});
