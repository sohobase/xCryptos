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
    fontSize: THEME.FONT_SIZE_NORMAL,
    fontWeight: 'bold',
    color: THEME.WHITE,
  },

  drawer: {},

  label: {
    fontWeight: 'bold',
  },

  item: {
    margin: THEME.OFFSET,
  },

  link: {
    padding: THEME.OFFSET,
  },

  button: {
    margin: THEME.OFFSET,
    paddingTop: THEME.OFFSET,
    paddingBottom: THEME.OFFSET,
  },
});
