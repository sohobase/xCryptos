import { StyleSheet } from 'react-native';
import THEME from './theme';

export default StyleSheet.create({

  BULLET: {
    width: THEME.UNIT * 0.65,
    height: THEME.UNIT * 0.65,
    borderRadius: THEME.UNIT * 0.65,
    backgroundColor: THEME.CONTRAST,
  },

  CENTERED: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  CHIP: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
    paddingTop: THEME.UNIT * 0.5,
    paddingBottom: THEME.UNIT * 0.5,
    paddingLeft: THEME.UNIT,
    paddingRight: THEME.UNIT,
    borderRadius: THEME.UNIT * 2,
  },

  MODAL_FOOTER: {
    padding: THEME.OFFSET,
  },

  DRAWER_LABEL: {
    marginLeft: 0,
    fontWeight: THEME.FONT.WEIGHT.BOLD,
  },

  DRAWER_ICON: {
    width: THEME.UNIT * 2.4,
    height: THEME.UNIT * 2.4,
    tintColor: 'rgba(0,0,0,0.5)',
  },

  LAYOUT_MAIN: {
    flex: 1,
    height: THEME.MAIN_LAYOUT_HEIGHT,
    minHeight: THEME.MAIN_LAYOUT_HEIGHT,
    maxHeight: THEME.MAIN_LAYOUT_HEIGHT,
    backgroundColor: THEME.PRIMARY,
  },

  LAYOUT_SECONDARY: {
    zIndex: 1,
    flex: 0,
    height: THEME.SECOND_LAYOUT_HEIGHT,
    minHeight: THEME.SECOND_LAYOUT_HEIGHT,
    maxHeight: THEME.SECOND_LAYOUT_HEIGHT,
    backgroundColor: THEME.WHITE,
    elevation: 12,
    shadowColor: THEME.BLACK,
    shadowOffset: { height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },

  LIST_ITEM: {
    backgroundColor: THEME.WHITE,
    borderBottomColor: THEME.BACKGROUND_DARK_HIGHLIGHT,
    borderBottomWidth: 1,
    paddingHorizontal: THEME.OFFSET,
    paddingVertical: THEME.UNIT,
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
