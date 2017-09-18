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

  priceBox: {
    display: 'flex',
    height: PRICE_BOX_SIZE,
    width: PRICE_BOX_SIZE,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },

  price: {
    fontSize: THEME.FONT_SIZE_SMALL,
  },

  market: {
    flex: 1,
    marginLeft: THEME.UNIT,
    marginRight: THEME.UNIT,
  },

  button: {
    marginRight: THEME.OFFSET,
  },

  buttonCaption: {
    fontSize: THEME.FONT_SIZE_SMALL,
  },
});
