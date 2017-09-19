import { array, bool, func, number, oneOfType, string } from 'prop-types';
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
  captionStyle: oneOfType(array, number),
  disabled: bool,
  onPress: func,
  style: oneOfType(array, number),
};

Button.defaultProps = {
  caption: undefined,
  captionStyle: [],
  disabled: false,
  onPress: undefined,
  style: [],
};

export default Button;
