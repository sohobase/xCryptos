import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: '17.5%',
    padding: THEME.OFFSET,
    justifyContent: 'center',
    backgroundColor: THEME.PRIMARY,
  },

  title: {
    marginTop: THEME.OFFSET,
    fontSize: THEME.FONT_SIZE_LARGE,
    fontWeight: THEME.FONT_WEIGHT_BOLD,
    color: THEME.WHITE,
  },

  version: {
    fontSize: THEME.FONT_SIZE_SMALL,
    color: THEME.CONTRAST,
  },

  options: {
    marginTop: THEME.OFFSET,
  },

  drawerItems: {
    marginTop: 0,
  },

  item: {
    margin: THEME.OFFSET,
  },

  link: {
    padding: THEME.OFFSET,
  },

  linkCaption: {
    paddingLeft: THEME.OFFSET,
  },

  button: {
    margin: THEME.OFFSET,
    paddingTop: THEME.OFFSET,
    paddingBottom: THEME.OFFSET,
  },
});
