import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  CONTRAST, PRIMARY, WHITE, FONT, UNIT, OFFSET,
} = THEME;

export default StyleSheet.create({
  button: {
    marginLeft: 0,
    marginRight: 0,
    tintColor: WHITE,
  },

  container: {
    flex: 0,
    width: '100%',
    paddingVertical: OFFSET,
    shadowColor: PRIMARY,
    shadowOffset: { height: UNIT * -1, width: 0 },
    shadowOpacity: 1,
    shadowRadius: UNIT / 2,
  },

  coin: {
    flex: 1,
  },

  header: {
    marginHorizontal: OFFSET,
    marginBottom: OFFSET,
  },

  hodl: {
    fontSize: FONT.SIZE.SMALL,
    color: CONTRAST,
  },


  text: {
    color: WHITE,
    backgroundColor: 'transparent',
  },

  name: {
    fontSize: FONT.SIZE.EXTRA_LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
    marginRight: UNIT / 2,
    maxWidth: '65%',
    maxHeight: FONT.SIZE.EXTRA_LARGE,
    lineHeight: FONT.SIZE.EXTRA_LARGE,
  },

  trend: {
    fontSize: FONT.SIZE.SMALL,
    fontWeight: FONT.WEIGHT.BOLD,
    color: CONTRAST,
  },
});
