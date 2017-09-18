import { bool, func, number, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import Touchable from '../../Touchable';
import { STYLE, THEME } from '../../../config';
import styles from './TimelineOption.style';

const { ANIMATION_DURATION, ANIMATION_EASING } = THEME;

const TimelineOption = ({ caption, current, delay, onPress, refreshing }) => {
  const styleBullet = [STYLE.BULLET, styles.bullet];
  const styleOption = [styles.caption];
  if (caption === current) {
    styleBullet.push(styles.bulletActive);
    styleOption.push(styles.captionActive);
  } else if (refreshing) {
    styleBullet.push(styles.disabled);
    styleOption.push(styles.disabled);
  }

  return (
    <Touchable onPress={onPress}>
      <Animatable
        animation={'fadeIn'}
        delay={ANIMATION_DURATION * delay}
        duration={ANIMATION_DURATION / 2}
        easing={ANIMATION_EASING}
        style={[STYLE.ROW, styles.container]}
      >
        <View style={styleBullet} />
        <Text style={styleOption}>{caption}</Text>
      </Animatable>
    </Touchable>
  );
};

TimelineOption.propTypes = {
  caption: string,
  current: string,
  delay: number,
  onPress: func,
  refreshing: bool,
};

TimelineOption.defaultProps = {
  caption: undefined,
  current: undefined,
  delay: 0,
  onPress: undefined,
  refreshing: false,
};

export default TimelineOption;
