import { number, string } from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { STYLE, THEME } from '../../../config';
import styles from './ChipPrice.style';

const ChipPrice = ({ caption, value }) => (
  <Animatable
    animation="bounceIn"
    delay={(caption === 'low') ? THEME.ANIMATION_QUICK_DURATION : 0}
    duration={THEME.ANIMATION_DURATION}
    easing={THEME.ANIMATION_EASING}
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
};

ChipPrice.defaultProps = {
  caption: undefined,
  value: 0,
};

export default ChipPrice;
