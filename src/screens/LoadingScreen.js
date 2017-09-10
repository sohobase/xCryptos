import React from 'react';
import { Image, Text, View } from 'react-native';
import { STYLE } from '../config';
import styles from './LoadingScreen.style';
import PKG from '../../package.json';

const logo = require('../assets/app-icon.png');

export default () => {
  return (
    <View style={[STYLE.SCREEN, styles.container]}>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.version}>{`v${PKG.version}`}</Text>
    </View>
  );
};
