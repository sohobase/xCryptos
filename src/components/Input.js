import { array, number, oneOfType } from 'prop-types';
import React from 'react';
import { TextInput } from 'react-native';
import styles from './Input.style';

const Input = ({ style, ...inherit }) => (
  <TextInput
    {...inherit}
    autoCorrect={false}
    autoCapitalize="none"
    keyboardType="numeric"
    underlineColorAndroid="transparent"
    placeholderTextColor={undefined}
    style={[
      styles.input,
      (!inherit.editable && styles.disabled),
      style,
    ]}
  />
);

Input.propTypes = {
  style: oneOfType([array, number]),
};

Input.defaultProps = {
  style: [],
};

export default Input;
