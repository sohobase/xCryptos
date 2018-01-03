import { number, string } from 'prop-types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { THEME } from '../../../config';
import styles from './ChartBar.style';

const ChartBar = ({
  color, delay, value, ...inherit
}) => (
  <TouchableOpacity {...inherit} style={styles.container}>
    <Motion
      animation="slideInUp"
      delay={delay}
      duration={THEME.ANIMATION_QUICK_DURATION}
      easing={THEME.ANIMATION_EASING}
      style={[styles.value, { height: `${value}%`, backgroundColor: color }]}
    />
  </TouchableOpacity>
);

ChartBar.propTypes = {
  color: string,
  delay: number,
  value: number,
};

ChartBar.defaultProps = {
  value: 0,
  delay: 0,
  color: undefined,
};

export default ChartBar;
