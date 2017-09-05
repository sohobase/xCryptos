import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.PRIMARY,
    paddingVertical: 4,
    paddingLeft: 12,
  },
  active: {
    backgroundColor: THEME.BACKGROUND_HIGHLIGHT,
  },
  currency: {
    flex: 1,
  },
  text: {
    color: THEME.CONTRAST,
  },
  values: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'flex-end',
  },
  value: {
    color: THEME.WHITE,
    fontSize: 20,
  },
  blink: {
    width: THEME.UNIT * 0.2,
    height: '100%',
    marginLeft: THEME.UNIT * 0.3,
    backgroundColor: THEME.CONTRAST,
  },
});
