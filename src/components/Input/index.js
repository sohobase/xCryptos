import { array, number, oneOfType } from 'prop-types';
import React from 'react';
import { TextInput } from 'react-native';

import styles from './style';

const Input = ({ style, ...inherit }) => (
  <TextInput
    keyboardType="numeric"
    autoCorrect={false}
    autoCapitalize="none"
    underlineColorAndroid="transparent"
    placeholderTextColor={undefined}
    {...inherit}
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
