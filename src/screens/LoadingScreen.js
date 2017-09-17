import React from 'react';
import { View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { STYLE } from '../config';
import { Logo } from '../components';
import styles from './LoadingScreen.style';

export default () => {
  return (
    <View style={[STYLE.SCREEN, STYLE.CENTERED, styles.container]}>
      <Animatable animation="bounceIn" duration={1000}>
        <Logo style={styles.logo} />
      </Animatable>
    </View>
  );
};
