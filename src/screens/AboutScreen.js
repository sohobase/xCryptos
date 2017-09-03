import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { STYLE } from '../config';
import { ButtonDrawer } from './components';
import styles from './AboutScreen.style';
import pkg from '../../package.json';

class AboutScreen extends Component {
  static navigationOptions({ navigation }) {
    return {
      drawerLabel: 'About',
      headerLeft: <ButtonDrawer navigation={navigation} />,
      title: 'About',
    };
  }

  render() {
    return (
      <Image style={[STYLE.SCREEN, styles.container]} source={require('../assets/background.png')}>
        <View style={styles.info}>
          <Text style={[styles.text, styles.name]}>{pkg.name}</Text>
          <Text style={[styles.text, styles.version]}>v{pkg.version}</Text>
        </View>
        <Text style={[styles.text, styles.authors]}>Created by Javi Jimenez & Mikel in Chiang Mai, Thailand</Text>
      </Image>
    );
  }
}

export default AboutScreen;
