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

  CURRENCY_ICON: {
    width: THEME.UNIT * 3.6,
    height: THEME.UNIT * 3.6,
    marginRight: THEME.OFFSET,
  },

  CURRENCY_SYMBOL: {
    color: THEME.WHITE,
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE,
    lineHeight: THEME.FONT_SIZE_EXTRA_LARGE,
  },

  MODAL_BUTTON: {
    marginTop: THEME.OFFSET,
    paddingTop: THEME.OFFSET,
    paddingBottom: THEME.OFFSET,
  },

  DRAWER_LABEL: {
    marginLeft: 0,
    fontWeight: THEME.FONT_WEIGHT_BOLD,
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
    flex: 0,
    height: THEME.SECOND_LAYOUT_HEIGHT,
    minHeight: THEME.SECOND_LAYOUT_HEIGHT,
    maxHeight: THEME.SECOND_LAYOUT_HEIGHT,
    backgroundColor: THEME.WHITE,
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
  },

});
