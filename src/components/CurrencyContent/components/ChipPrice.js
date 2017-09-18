import { bool, number, string } from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { STYLE, THEME } from '../../../config';
import styles from './ChipPrice.style';

const { ANIMATION_DURATION, ANIMATION_EASING } = THEME;

const ChipPrice = ({ caption, refreshing, value }) => (
  <Animatable
    animation={refreshing ? 'bounceOut' : 'bounceIn'}
    delay={(caption === 'low' && !refreshing) ? 1000 : 0}
    duration={ANIMATION_DURATION}
    easing={ANIMATION_EASING}
    style={[STYLE.ROW, STYLE.CHIP, styles[caption]]}
  >
    <Text style={styles.label}>$</Text>
    <Text style={styles.price}>{value}</Text>
    <Text style={styles.label}>{` ${caption}`}</Text>
  </Animatable>
);

ChipPrice.propTypes = {
  caption: string,
  value: number,
  refreshing: bool,
};

ChipPrice.defaultProps = {
  caption: undefined,
  value: 0,
  refreshing: false,
};

export default ChipPrice;
