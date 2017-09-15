import React from 'react';
import { Image, View } from 'react-native';
import { STYLE } from '../config';
import styles from './LoadingScreen.style';

const logo = require('../assets/app-logo.png');

export default () => {
  return (
    <View style={[STYLE.SCREEN, STYLE.CENTERED, styles.container]}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};
