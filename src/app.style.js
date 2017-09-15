import { Platform, StatusBar, StyleSheet } from 'react-native';
import { STYLE, THEME } from './config';

let androidHeader = {};
if (Platform.OS !== 'ios') androidHeader = { paddingTop: StatusBar.currentHeight, height: 80 };

export default StyleSheet.create({
  header: Object.assign(
    {
      backgroundColor: THEME.PRIMARY,
      elevation: 0,
      shadowColor: 'transparent',
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    }, androidHeader),
});
