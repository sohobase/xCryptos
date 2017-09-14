import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const PRICE_BOX_SIZE = THEME.UNIT * 8;

export default StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
    borderBottomColor: THEME.BACKGROUND_DARK_HIGHLIGHT,
    borderBottomWidth: 1,
  },

  price: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    width: PRICE_BOX_SIZE,
    height: PRICE_BOX_SIZE,
    lineHeight: PRICE_BOX_SIZE,
    fontSize: THEME.FONT_SIZE_SMALL,
    textAlign: 'center',
  },

  market: {
    flex: 1,
    marginLeft: THEME.UNIT,
    marginRight: THEME.UNIT,
  },

  button: {
    marginRight: THEME.OFFSET,
  },
});
