import { bool, func, string } from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { STYLE, THEME } from '../../../config';
import { Touchable } from '../../../components';
import styles from './TimelineOption.style';

const { MOTION } = THEME;

const TimelineOption = ({ active, caption, onPress }) => (
  <Touchable onPress={onPress}>
    <Motion
      {...MOTION.DEFAULT}
      delay={MOTION.DURATION}
      style={[STYLE.CHIP, STYLE.ROW, styles.container, (active && styles.active)]}
    >
      <Text style={[styles.caption, (active && styles.captionActive)]}>{caption}</Text>
    </Motion>
  </Touchable>
);

TimelineOption.propTypes = {
  active: bool,
  caption: string,
  onPress: func,
};

TimelineOption.defaultProps = {
  active: false,
  caption: undefined,
  onPress: undefined,
};

export default TimelineOption;
