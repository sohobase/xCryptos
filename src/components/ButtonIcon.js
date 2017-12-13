import { array, func, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { ASSETS } from '../config';
import Touchable from './Touchable';
import styles from './ButtonIcon.style';

const ButtonIcon = ({ icon, onPress, style }) => (
  <Touchable onPress={onPress}>
    <Image style={[styles.icon, style]} source={ASSETS[icon]} />
  </Touchable>
);

ButtonIcon.propTypes = {
  icon: string,
  onPress: func,
  style: oneOfType([array, number]),
};

ButtonIcon.defaultProps = {
  icon: undefined,
  onPress: undefined,
  style: [],
};

export default ButtonIcon;
