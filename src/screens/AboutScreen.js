import React, { Component } from 'react';
import { Image, Linking, Platform, Share, Text, View } from 'react-native';
import { ASSETS, C, STYLE, TEXT } from '../config';
import { ButtonIcon, Logo } from '../components';
import styles from './AboutScreen.style';
import PKG from '../../package.json';

const background = require('../../assets/app-about.jpg');

const { SOHOBASE, STORE_URL: { ANDROID, IOS } } = C;
const { EN: { COPYRIGHT } } = TEXT;
const { name, version } = PKG;

const storeURL = (Platform.OS === 'ios') ? IOS : ANDROID;

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
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.text}>v{version}</Text>
        </View>
        <View style={styles.copyright}>
          <Image onPress={() => Linking.openURL(SOHOBASE.URL)} style={styles.brand} source={ASSETS.sohobase} />
          <Text style={styles.text}>❤️</Text>
          <Text style={styles.text}>{COPYRIGHT}</Text>
        </View>
      </View>
    );
  }
}

export default AboutScreen;
