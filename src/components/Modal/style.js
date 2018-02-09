import { StyleSheet } from 'react-native';

import { THEME } from '../../config';


const {
  WHITE, FONT, UNIT, OFFSET,
} = THEME;

export default StyleSheet.create({
  background: {
    backgroundColor: THEME.MODAL_BACKGROUND,
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },

  container: {
    backgroundColor: WHITE,
    borderTopLeftRadius: UNIT,
    borderTopRightRadius: UNIT,
    paddingVertical: OFFSET,
    position: 'absolute',
    width: '100%',
    height: 'auto',
  },

  header: {
    marginBottom: OFFSET,
    paddingHorizontal: OFFSET,
  },

  title: {
    flex: 1,
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
    textAlign: 'center',
  },

  close: {
    marginLeft: UNIT * -2.8,
    marginRight: 0,
    opacity: 0.5,
  },

  content: {
    borderTopColor: THEME.BACKGROUND_DARK_HIGHLIGHT,
    borderTopWidth: 1,
  },
});
