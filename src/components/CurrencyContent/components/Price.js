import { number, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { STYLE, THEME } from '../../../config';
import styles from './Price.style';

const { ANIMATION_DURATION, ANIMATION_EASING } = THEME;

const Price = ({ symbol, value }) => (
  <Animatable
    animation="fadeIn"
    delay={ANIMATION_DURATION}
    duration={ANIMATION_DURATION}
    easing={ANIMATION_EASING}
  >
    <View style={styles.container}>
      <Text style={[styles.label, styles.symbol]}>$</Text>
      <Text style={styles.price}>{value} </Text>
      <Animatable
        animation="bounceIn"
        delay={ANIMATION_DURATION * 2}
        duration={ANIMATION_DURATION}
        easing={ANIMATION_EASING}
        style={[STYLE.CHIP, styles.chip]}
      >
        <Text style={[styles.small, styles.label, styles.bold]}>{symbol}</Text>
      </Animatable>
    </View>
  </Animatable>
);

Price.propTypes = {
  symbol: string,
  value: number,
};

Price.defaultProps = {
  symbol: undefined,
  value: 0,
};

export default Price;
