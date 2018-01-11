import { StyleSheet } from 'react-native';
import THEME from './theme';

const {
  COLOR, FONT, UNIT, OFFSET,
} = THEME;

export default StyleSheet.create({

  CENTERED: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  CHIP: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
    paddingVertical: UNIT * 0.375,
    paddingHorizontal: UNIT * 0.75,
    borderRadius: UNIT * 2,
    minHeight: UNIT,
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

  GREEN: {
    backgroundColor: COLOR.GREEN,
  },

  LIST_ITEM: {
    backgroundColor: THEME.WHITE,
    borderBottomColor: THEME.BACKGROUND_DARK_HIGHLIGHT,
    borderBottomWidth: 1,
    paddingHorizontal: OFFSET,
    paddingVertical: UNIT,
  },

  RED: {
    backgroundColor: COLOR.RED,
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
