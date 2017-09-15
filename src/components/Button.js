import { func, number, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { THEME } from '../config';
import Touchable from './Touchable';
import styles from './Button.style';

const Button = ({ caption, color, onPress, style, tintColor }) => (
  <Touchable onPress={onPress}>
    <View style={[styles.container, style, { backgroundColor: tintColor }]}>
      <Text style={[styles.caption, { color }]}>{caption}</Text>
    </View>
  </Touchable>
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
  tintColor: THEME.PRIMARY,
};

export default Button;
