import { Dimensions, Platform, StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  BLACK, FONT, WHITE, OFFSET, UNIT,
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
    bottom: OFFSET * -1,
    elevation: 10,
    height: '42.5%',
    paddingBottom: isIphoneX ? OFFSET * 2 : 0,
    position: 'absolute',
    shadowColor: BLACK,
    shadowOffset: { height: -2, width: 0 },
    shadowOpacity: 0.26,
    shadowRadius: 5,
    width: '100%',
    zIndex: 1,
  },

  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
  },

  button: {
    width: iOS ? UNIT * 10.6 : '33%',
    height: '25%',
  },

  caption: {
    fontSize: FONT.SIZE.EXTRA_LARGE,
  },
});
