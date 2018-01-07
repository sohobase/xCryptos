import { number, string } from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { ASSET, STYLE, THEME } from '../../../config';
import { Amount } from '../../../components';
import styles from './ChipPrice.style';

const { MOTION } = THEME;

const ChipPrice = ({
  icon, price, value = 0,
}) => (
  <Motion
    {...MOTION.DEFAULT}
    animation={value > 0 ? 'bounceIn' : 'bounceOut'}
    delay={value > 0 ? (icon === 'up' ? 200 : 400) : 0} // eslint-disable-line
    style={[STYLE.CHIP, styles[icon]]}
  >
    { value > 0 &&
      <View style={STYLE.ROW}>
        <Image style={styles.icon} source={ASSET[icon]} />
        <View style={styles.margin}>
          <Amount style={styles.value} value={value} />
        </View>
        <Amount
          style={styles.label}
          value={parseInt(((value * 100) / price) - 100, 10)}
          symbol="%"
        />
      </View> }
  </Motion>
);

ChipPrice.propTypes = {
  icon: string,
  price: number,
  value: number,
};

ChipPrice.defaultProps = {
  icon: undefined,
  price: number,
  value: 0,
};

export default ChipPrice;
