import React, { Component } from 'react';
import { View } from 'react-native';
import { STYLE } from '../config';
import { ButtonDrawer } from './components';
import styles from './SettingsScreen.style';

class SettingsScreen extends Component {
  static navigationOptions({ navigation }) {
    return {
      drawerLabel: 'Settings',
      headerLeft: <ButtonDrawer navigation={navigation} />,
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
