import { StyleSheet } from 'react-native';

import { THEME } from '../../config';

const { CONTRAST, UNIT, OFFSET } = THEME;

export default StyleSheet.create({
  blink: {
    width: UNIT * 0.2,
    height: OFFSET,
    marginLeft: UNIT * 0.3,
    backgroundColor: CONTRAST,
  },
});
