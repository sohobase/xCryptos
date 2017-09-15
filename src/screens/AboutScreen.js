import React, { Component } from 'react';
import { Image, Linking, Text, View } from 'react-native';
import { C, STYLE } from '../config';
import { ButtonIcon } from '../components';
import styles from './AboutScreen.style';
import pkg from '../../package.json';

const javi = pkg.contributors[0];
const mikel = pkg.contributors[1];
const logo = require('../assets/app-logo.png');

class AboutScreen extends Component {
  static navigationOptions({ navigation }) {
    const { navigate } = navigation;
    return {
      drawerLabel: 'About',
      drawerIcon: ({ tintColor }) => <Image source={C.ICON.info} style={[STYLE.DRAWER_ICON, { tintColor }]} />,
      headerLeft: <ButtonIcon icon="menu" onPress={() => navigate('DrawerOpen')} />,
      title: 'About',
    };
  }

  render() {
    return (
      <View style={[STYLE.SCREEN, styles.container]}>
        <View style={styles.info}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.name}>{pkg.name}</Text>
          <Text style={[styles.text, styles.version]}>v{pkg.version}</Text>
        </View>
        <View style={styles.authors}>
          <Text style={styles.text}>Created by </Text>
          <Text style={styles.author} onPress={() => Linking.openURL(javi.url)}>{javi.name}</Text>
          <Text style={styles.text}> & </Text>
          <Text style={styles.author} onPress={() => Linking.openURL(mikel.url)}>{mikel.name}</Text>
          <Text style={styles.text}>.</Text>
        </View>
      </View>
    );
  }
}

export default AboutScreen;
