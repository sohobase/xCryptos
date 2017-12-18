import React from 'react';
import { View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { STYLE } from '../../config';
import { Logo } from '../../components';
import styles from './Loading.style';

export default () => (
  <View style={[STYLE.SCREEN, STYLE.CENTERED, styles.container]}>
    <Motion animation="bounceIn" duration={1000}>
      <Logo style={styles.logo} />
    </Motion>
  </View>
);
