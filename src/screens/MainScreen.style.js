import { Platform, StyleSheet } from 'react-native';

const isAndroid = (Platform.OS !== 'ios');

export default StyleSheet.create({
  logo: {
    width: isAndroid ? 76 : 40,
    height: isAndroid ? 48 : 32,
    resizeMode: 'center',
  },
});
