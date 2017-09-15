import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { } from '../actions';
import { STYLE } from '../config';
import styles from './AlertsScreen.style';

class AlertsScreen extends Component {
  static navigationOptions = {
    title: 'Alerts',
  };

  render() {
    return (
      <View style={STYLE.SCREEN} />
    );
  }
}

AlertsScreen.propTypes = {
};

AlertsScreen.defaultProps = {
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AlertsScreen);
