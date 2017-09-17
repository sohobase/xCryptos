import { array, bool, func, number, oneOf, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { THEME } from '../config';
import Touchable from './Touchable';
import styles from './Button.style';

const Button = ({ caption, color, disabled, onPress, style, tintColor }) => (
  <Touchable onPress={!disabled ? onPress : undefined}>
    <View style={[styles.container, style, { backgroundColor: tintColor }, (disabled ? styles.disabled : undefined)]}>
      <Text style={[styles.caption, { color }]}>{caption}</Text>
    </View>
  </Touchable>
);

Button.propTypes = {
  caption: string,
  color: string,
  disabled: bool,
  onPress: func,
  style: oneOf(array, number),
  tintColor: string,
};

Button.defaultProps = {
  caption: undefined,
  color: THEME.WHITE,
  disabled: false,
  onPress: undefined,
  style: undefined,
  tintColor: THEME.PRIMARY,
};

export default Button;
