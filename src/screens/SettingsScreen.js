import React, { Component } from 'react';
import { View } from 'react-native';
import { STYLE } from '../config';
import { ButtonIcon } from '../components';
// import styles from './SettingsScreen.style';

class SettingsScreen extends Component {
  static navigationOptions({ navigation }) {
    const { navigate } = navigation;
    return {
      drawerLabel: 'Settings',
      headerLeft: <ButtonIcon icon="menu" onPress={() => navigate('DrawerOpen')} />,
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
      <View style={STYLE.SCREEN} />
    );
  }
}

export default SettingsScreen;
