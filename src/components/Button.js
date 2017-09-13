import { func, number, string } from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../config';
import styles from './Button.style';

const Button = ({ caption, color, onPress, style, tintColor }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.container, style, { backgroundColor: tintColor }]}>
      <Text style={[styles.caption, { color }]}>{caption}</Text>
    </View>
  </TouchableOpacity>
);

Button.propTypes = {
  caption: string,
  color: string,
  onPress: func,
  style: number,
  tintColor: string,
};

Button.defaultProps = {
  caption: undefined,
  color: THEME.WHITE,
  onPress: undefined,
  style: undefined,
  tintColor: THEME.ACCENT,
};

export default Button;
