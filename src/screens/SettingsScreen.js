import React, { Component } from 'react';
import { Button, View } from 'react-native';
import styles from './SettingsScreen.style';

class SettingsScreen extends Component {
  static navigationOptions({ navigation }) {
    const { navigate } = navigation;

    return {
      drawerLabel: 'Settings',
      headerLeft: <Button title="menu" onPress={() => navigate('DrawerOpen')} />,
      title: 'Settings',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  render() {
    return (
      <View style={styles.container} />
    );
  }
}

export default SettingsScreen;
