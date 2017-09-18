import { number, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { STYLE, THEME } from '../../../config';
import styles from './Prices.style';

const { ANIMATION_DURATION, ANIMATION_EASING } = THEME;

const Prices = ({ symbol, value }) => (
  <Animatable
    animation="fadeIn"
    delay={ANIMATION_DURATION}
  >
    <View style={styles.container}>
      <Text style={[styles.label, styles.symbol]}>$</Text>
      <Text style={styles.price}>{value} </Text>
      <Animatable style={[STYLE.CHIP, styles.chipSymbol]}>
        <Text style={[styles.small, styles.label, styles.bold]}>{symbol}</Text>
      </Animatable>
    </View>
  </Animatable>
);

Prices.propTypes = {
  symbol: string,
  value: number,
};

Prices.defaultProps = {
  symbol: undefined,
  value: 0,
};

export default Prices;
