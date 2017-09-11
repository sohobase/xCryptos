import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  chart: {
    flex: 0,
    height: THEME.UNIT * 12.8,
  },

  navButton: {
    flex: 1,
  },

  tab: {
    padding: THEME.UNIT * 0.5,
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
    fontWeight: 'bold',
    textAlign: 'center',
    color: THEME.CONTRAST,
  },

  tabActive: {
    backgroundColor: THEME.WHITE,
    color: THEME.PRIMARY,
  },

  tabMargin: {
    marginLeft: THEME.UNIT * 0.5,
    marginRight: THEME.UNIT * 0.5,
  },

  left: {
    flex: 1,
  },

  label: {
    color: THEME.CONTRAST,
  },

  highlight: {
    color: THEME.WHITE,
    fontWeight: 'bold',
  },

  right: {
    textAlign: 'right',
  },
});
