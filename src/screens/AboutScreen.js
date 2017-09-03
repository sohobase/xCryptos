import React, { Component } from 'react';
import { Button, Image, Text, View } from 'react-native';
import styles from './AboutScreen.style';
import pkg from '../../package.json';

class AboutScreen extends Component {
  static navigationOptions({ navigation }) {
    const { navigate } = navigation;

    return {
      drawerLabel: 'About',
      headerLeft: <Button title="menu" onPress={() => navigate('DrawerOpen')} />,
      title: 'About',
    };
  }

  render() {
    return (
      <Image style={styles.container} source={require('../assets/background.png')}>
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
