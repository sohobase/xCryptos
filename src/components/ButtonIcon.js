import { array, func, number, object, oneOfType, string } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { ASSET } from '../config';
import Touchable from './Touchable';
import styles from './ButtonIcon.style';

const ButtonIcon = ({ icon, onPress, style }) => (
  <Touchable onPress={onPress}>
    <Image style={[styles.icon, style]} source={ASSET[icon]} />
  </Touchable>
);

ButtonIcon.propTypes = {
  icon: string,
  onPress: func,
  style: oneOfType([array, number, object]),
};

ButtonIcon.defaultProps = {
  icon: undefined,
  onPress: undefined,
  style: [],
};

export default ButtonIcon;
