import { StyleSheet } from 'react-native';
import { THEME } from '../config';


export default StyleSheet.create({
  chart: {
    flex: 0,
    height: THEME.UNIT * 12.8,
  },

  filters: {
    // marginBottom: THEME.UNIT,
  },

  option: {
    padding: THEME.UNIT * 0.75,
  },

  bullet: {
    marginRight: THEME.UNIT * 0.35,
  },

  bulletActive: {
    backgroundColor: THEME.ACCENT,
  },

  optionCaption: {
    fontWeight: THEME.FONT_WEIGHT_BOLD,
    opacity: 0.75,
  },

  optionCaptionActive: {
    color: THEME.WHITE,
    opacity: 1,
  },

  small: {
    fontSize: THEME.FONT_SIZE_SMALL,
  },

  label: {
    color: THEME.CONTRAST,
  },

});
