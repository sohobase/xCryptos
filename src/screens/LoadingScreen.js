import React from 'react';
import { View } from 'react-native';
import { STYLE } from '../config';
import { Logo } from '../components';
import styles from './LoadingScreen.style';

export default () => {
  return (
    <View style={[STYLE.SCREEN, STYLE.CENTERED, styles.container]}>
      <Logo style={styles.logo} />
    </View>
  );
};
