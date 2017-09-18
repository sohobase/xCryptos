import { array, bool, func, number, oneOf, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import Touchable from './Touchable';
import styles from './Button.style';

const Button = ({ caption, captionStyle, disabled, onPress, style }) => (
  <Touchable onPress={!disabled ? onPress : undefined}>
    <View style={[styles.container, style, (disabled ? styles.disabled : undefined)]}>
      <Text style={[styles.caption, captionStyle]}>{caption}</Text>
    </View>
  </Touchable>
);

Button.propTypes = {
  caption: string,
  captionStyle: oneOf(array, number),
  disabled: bool,
  onPress: func,
  style: oneOf(array, number),
};

Button.defaultProps = {
  caption: undefined,
  captionStyle: undefined,
  disabled: false,
  onPress: undefined,
  style: undefined,
};

export default Button;
