import React from 'react';
import { View } from 'react-native';
import { STYLE } from '../config';
import styles from './LoadingScreen.style';

export default () => {
  return (
    <View style={[STYLE.SCREEN, styles.container]} />
  );
};
