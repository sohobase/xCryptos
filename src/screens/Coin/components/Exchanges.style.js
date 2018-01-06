import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR_SECONDARY, FONT, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: UNIT / 2,
    justifyContent: 'center',
  },

  item: {
    padding: UNIT,
    margin: UNIT / 2,
    elevation: 2,
    shadowColor: THEME.BLACK,
    shadowOffset: { height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    width: '30%',
  },

  market: {
    fontSize: FONT.SIZE.SMALL,
    color: COLOR_SECONDARY,
  },

  button: {
    fontSize: FONT.SIZE.SMALL,
  },
});
