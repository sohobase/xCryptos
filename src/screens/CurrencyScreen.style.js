import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    backgroundColor: THEME.PRIMARY,
    padding: THEME.OFFSET,
  },

  section: {
    marginBottom: THEME.OFFSET,
  },

  currency: {
    flex: 1,
  },

  title: {
    fontSize: THEME.FONT_SIZE_NORMAL,
    color: THEME.WHITE,
  },

  currentPrice: {
    fontSize: THEME.FONT_SIZE_LARGE,
  },

  highlight: {
    color: THEME.WHITE,
    fontWeight: 'bold',
  },

  label: {
    color: THEME.CONTRAST,
  },

  left: {
    flex: 1,
  },

  right: {
    textAlign: 'right',
  },

  chart: {
    height: THEME.UNIT * 12.8,
    marginTop: THEME.UNIT * 0.5,
    marginBottom: THEME.UNIT * 0.5,
  },

  navigation: {
  },

  time: {
    flex: 1,
    padding: THEME.UNIT * 0.5,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
    color: THEME.CONTRAST,
  },

  timeMiddle: {
    marginLeft: THEME.UNIT * 0.5,
    marginRight: THEME.UNIT * 0.5,
  },

  timeActive: {
    backgroundColor: THEME.WHITE,
    color: THEME.PRIMARY,
  },
});
