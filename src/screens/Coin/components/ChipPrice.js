import { number, string } from 'prop-types';
import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { ASSET, STYLE, THEME } from '../../../config';
import { Amount } from '../../../components';
import styles from './ChipPrice.style';

const {
  ANIMATION_DURATION, ANIMATION_EASING, ANIMATION_QUICK_DURATION, WHITE,
} = THEME;

const ChipPrice = ({ icon, price, value }) => (
  <Animatable
    animation="bounceIn"
    delay={icon === 'down' ? ANIMATION_QUICK_DURATION : 0}
    duration={ANIMATION_DURATION}
    easing={ANIMATION_EASING}
    style={[STYLE.CHIP, styles[icon]]}
  >
    {
      value !== 0
        ?
        (
          <View style={STYLE.ROW}>
            <Image style={styles.icon} source={ASSET[icon]} />
            <Amount style={styles.value} value={value} />
            <Text style={styles.label}>
              {` (${parseInt(((value * 100) / price) - 100, 10)}%)`}
            </Text>
          </View>
        )
        : <ActivityIndicator color={WHITE} />
    }
  </Animatable>
);

ChipPrice.propTypes = {
  price: number,
  icon: string,
  value: number,
};

ChipPrice.defaultProps = {
  price: number,
  icon: undefined,
  value: 0,
};

export default ChipPrice;
