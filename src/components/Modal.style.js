import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  background: {
    backgroundColor: THEME.MODAL_BACKGROUND,
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },

  container: {
    backgroundColor: THEME.WHITE,
    borderTopLeftRadius: THEME.UNIT,
    borderTopRightRadius: THEME.UNIT,
    paddingVertical: THEME.OFFSET,
  },

  header: {
    marginBottom: THEME.OFFSET,
    paddingHorizontal: THEME.OFFSET,
  },

  title: {
    flex: 1,
    fontSize: THEME.FONT.SIZE.LARGE,
    fontWeight: THEME.FONT.WEIGHT.BOLD,
    textAlign: 'center',
  },

  close: {
    marginLeft: THEME.UNIT * -2.8,
    marginRight: 0,
    opacity: 0.5,
  },

  content: {
    borderTopColor: THEME.BACKGROUND_DARK_HIGHLIGHT,
    borderTopWidth: 1,
  },
});
