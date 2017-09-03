import React from 'react';
import { Text, View } from 'react-native';
import { DrawerItems } from 'react-navigation';
import styles from './Drawer.style';
import pkg from '../../package.json';

export default props => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>{pkg.name}</Text>
    </View>
    <DrawerItems {...props} />
  </View>
);
