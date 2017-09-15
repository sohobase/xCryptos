import { number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import styles from './Bar.style';

const Bar = ({ color, value }) => (
  <View style={styles.container}>
    <View style={[styles.value, { height: `${value}%`, backgroundColor: color }]} />
  </View>
);

Bar.propTypes = {
  color: string,
  value: number,
};

Bar.defaultProps = {
  value: 0,
  color: undefined,
};

export default Bar;
