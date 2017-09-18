import { bool, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { THEME } from '../config';
import styles from './Bar.style';

const Bar = ({ animate, color, delay, value }) => (
  <View style={styles.container}>
    <Animatable
      animation={animate ? 'slideInUp' : undefined}
      delay={delay}
      duration={THEME.ANIMATION_QUICK_DURATION}
      easing={THEME.ANIMATION_EASING}
      style={[styles.value, { height: `${value}%`, backgroundColor: color }]}
    />
  </View>
);

Bar.propTypes = {
  animate: bool,
  color: string,
  delay: number,
  value: number,
};

Bar.defaultProps = {
  animate: false,
  value: 0,
  delay: 0,
  color: undefined,
};

export default Bar;
