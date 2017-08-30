import { func, number, string } from 'prop-types';
import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import styles from './VirtualButton.style';

const VirtualButton = ({ caption, value, onPress }) => (
  <TouchableHighlight
    __accessibilityRole="button"
    key={value}
    onPress={() => onPress(value)}
    style={styles.container}
    underlayColor="rgba(0,0,0,0.1)"
  >
    <Text style={styles.text}>{caption || value.toString()}</Text>
  </TouchableHighlight>
);

VirtualButton.propTypes = {
  caption: string,
  onPress: func,
  value: number,
};

VirtualButton.defaultProps = {
  caption: undefined,
  onPress: undefined,
  value: undefined,
};

export default VirtualButton;
