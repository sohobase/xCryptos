import { StyleSheet } from 'react-native';
import THEME from './theme';

const { FONT, UNIT, OFFSET } = THEME;

export default StyleSheet.create({

  CENTERED: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  CHIP: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
    paddingVertical: UNIT * 0.5,
    paddingHorizontal: UNIT,
    borderRadius: UNIT * 2,
    minHeight: UNIT * 2,
    minWidth: UNIT,
  },

  MODAL_FOOTER: {
    padding: OFFSET,
  },

  DRAWER_LABEL: {
    marginLeft: 0,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  DRAWER_ICON: {
    width: UNIT * 2.4,
    height: UNIT * 2.4,
    tintColor: 'rgba(0,0,0,0.5)',
  },

  LAYOUT_MAIN: {
    flex: 1,
    height: THEME.MAIN_LAYOUT_HEIGHT,
    minHeight: THEME.MAIN_LAYOUT_HEIGHT,
    maxHeight: THEME.MAIN_LAYOUT_HEIGHT,
    backgroundColor: THEME.PRIMARY,
    width: '100%',
  },

  LAYOUT_SECONDARY: {
    zIndex: 1,
    flex: 0,
    height: THEME.SECOND_LAYOUT_HEIGHT,
    minHeight: THEME.SECOND_LAYOUT_HEIGHT,
    maxHeight: THEME.SECOND_LAYOUT_HEIGHT,
    backgroundColor: THEME.WHITE,
    elevation: 16,
    shadowColor: THEME.BLACK,
    shadowOffset: { height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    width: '100%',
  },

  LIST_ITEM: {
    backgroundColor: THEME.WHITE,
    borderBottomColor: THEME.BACKGROUND_DARK_HIGHLIGHT,
    borderBottomWidth: 1,
    paddingHorizontal: OFFSET,
    paddingVertical: UNIT,
  },

  ROW: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  SCREEN: {
    flex: 1,
    backgroundColor: THEME.WHITE,
  },

});
