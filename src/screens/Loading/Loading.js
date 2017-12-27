import React from 'react';
import { Image, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { ASSET, STYLE } from '../../config';
import styles from './Loading.style';

export default () => (
  <View style={[STYLE.SCREEN, STYLE.CENTERED, styles.container]}>
    <Motion animation="bounceIn" duration={1000}>
      <Image style={styles.brandname} source={ASSET.brandname} />
    </Motion>
  </View>
);
