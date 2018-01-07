import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR_SECONDARY, FONT, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingVertical: UNIT,
  },

  item: {
    padding: UNIT,
    width: '33.3%',
  },

  market: {
    fontSize: FONT.SIZE.SMALL,
    color: COLOR_SECONDARY,
  },

  button: {
    fontSize: FONT.SIZE.SMALL,
  },
});
