import { func, number, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { STYLE } from '../config';
import Touchable from './Touchable';
import styles from './VirtualButton.style';

const VirtualButton = ({ caption, value, onPress }) => (
  <Touchable
    key={value}
    onPress={() => onPress(value)}
    style={[styles.container, STYLE.CENTERED]}
    underlayColor="rgba(0,0,0,0.1)"
  >
    <View style={[styles.container, STYLE.CENTERED]}>
      <Text style={styles.text}>{caption || value.toString()}</Text>
    </View>
  </Touchable>
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
