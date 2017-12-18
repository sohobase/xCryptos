import { bool, func, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { STYLE, THEME } from '../../../config';
import { Touchable } from '../../../components';
import styles from './TimelineOption.style';

const TimelineOption = ({
  caption, current, onPress, refreshing,
}) => {
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
        animation="fadeIn"
        delay={THEME.ANIMATION_DURATION}
        duration={THEME.ANIMATION_DURATION}
        easing={THEME.ANIMATION_EASING}
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
  onPress: func,
  refreshing: bool,
};

TimelineOption.defaultProps = {
  caption: undefined,
  current: undefined,
  onPress: undefined,
  refreshing: false,
};

export default TimelineOption;
