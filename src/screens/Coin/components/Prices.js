import { number } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { Amount } from '../../../components';
import { THEME } from '../../../config';
import ChipPrice from './ChipPrice';
import styles from './Prices.style';

const { MOTION } = THEME;

const Prices = ({
  high, low, price,
}) => (
  <View style={styles.prices}>
    <ChipPrice price={price} icon="up" value={high} />
    <Motion {...MOTION.DEFAULT} delay={300}>
      <Amount value={price} style={styles.price} />
    </Motion>
    <ChipPrice price={price} icon="down" value={low} />
  </View>
);

Prices.propTypes = {
  high: number,
  low: number,
  price: number,
};

Prices.defaultProps = {
  high: 0,
  low: 0,
  price: 0,
};

export default Prices;
