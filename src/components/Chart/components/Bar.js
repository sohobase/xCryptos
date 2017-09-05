import { number } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import styles from './Bar.style';

const Bar = ({ value }) => (
  <View style={styles.container}>
    <View style={[styles.value, { height: `${value}%` }]} />
  </View>
);

Bar.propTypes = {
  value: number,
};

Bar.defaultProps = {
  value: 0,
};

export default Bar;
