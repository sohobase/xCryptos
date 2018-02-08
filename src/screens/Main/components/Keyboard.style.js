import { Dimensions, Platform, StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  BLACK, FONT, LAYOUT: { BOTTOM_CONTENT_HEIGHT }, WHITE, OFFSET, UNIT,
} = THEME;
const iOS = Platform.OS === 'ios';
const isIphoneX = () => {
  const { height, width } = Dimensions.get('window');

  return (
    iOS &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812)
  );
};

export default StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    elevation: 8,
    height: 0,
    maxHeight: 0,
    paddingBottom: isIphoneX ? OFFSET * 2 : 0,
    shadowColor: BLACK,
    shadowOffset: { height: -2, width: 0 },
    shadowOpacity: 0.26,
    shadowRadius: 5,
    width: '100%',
    overflow: 'hidden',
  },

  visible: {
    height: 'auto',
    maxHeight: BOTTOM_CONTENT_HEIGHT,
  },

  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: BOTTOM_CONTENT_HEIGHT,
  },

  button: {
    width: iOS ? UNIT * 10.6 : '33%',
    height: UNIT * 8,
  },

  caption: {
    fontSize: FONT.SIZE.EXTRA_LARGE,
  },
});
