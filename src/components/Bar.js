import { bool, number } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import styles from './Bar.style';

const Bar = ({ highlight, value }) => (
  <View style={styles.container}>
    <View style={[styles.value, { height: `${value}%` }, (highlight ? styles.highlight : undefined)]} />
  </View>
);

Bar.propTypes = {
  highlight: bool,
  value: number,
};

Bar.defaultProps = {
  highlight: false,
  value: 0,
};

export default Bar;
