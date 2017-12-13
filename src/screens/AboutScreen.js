import React, { Component } from 'react';
import { Image, Linking, Platform, Share, Text, View } from 'react-native';
import { ASSETS, C, STYLE } from '../config';
import { ButtonIcon, Logo } from '../components';
import styles from './AboutScreen.style';
import pkg from '../../package.json';

const background = require('../../assets/app-about.jpg');

const javi = pkg.contributors[0];
const mikel = pkg.contributors[1];
const storeURL = (Platform.OS === 'ios') ? C.STORE_URL.IOS : C.STORE_URL.ANDROID;

class AboutScreen extends Component {
  static navigationOptions({ navigation }) {
    const { navigate } = navigation;
    return {
      drawerLabel: 'About',
      drawerIcon: ({ tintColor }) => <Image source={ASSETS.info} style={[STYLE.DRAWER_ICON, { tintColor }]} />,
      headerLeft: <ButtonIcon icon="menu" onPress={() => navigate('DrawerOpen')} />,
      title: 'About',
      headerRight: <ButtonIcon icon="share" onPress={() => Share.share({ message: storeURL })} />,
    };
  }

  render() {
    return (
      <View style={[STYLE.SCREEN, styles.container]}>
        <Image style={styles.background} source={background} />
        <View style={styles.info}>
          <Logo />
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
