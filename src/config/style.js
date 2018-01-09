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
