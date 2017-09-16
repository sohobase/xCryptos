import { arrayOf, func } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FlatList, Text, View } from 'react-native';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';

import { addAlertAction, removeAlertAction } from '../actions';
import { C, STYLE } from '../config';
import { AlertListItem, ButtonIcon } from '../components';
import styles from './AlertsScreen.style';

const keyExtractor = ({ currency, low, high }) => `${currency}${low}${high}${new Date()}`;

class AlertsScreen extends Component {
  static navigationOptions({ navigation: { state } }) {
    const { currency = {} } = state.params || {};

    return {
      title: `${currency.name} Alerts`,
      // headerRight: <ButtonIcon icon="add" onPress={() => console.log(this) } />,
    };
  }

  constructor(props) {
    super(props);

    this._addAlert = this._addAlert.bind(this);
    this._removeAlert = this._removeAlert.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }

  _addAlert() {
    const { addAlert } = this.props;
    addAlert();
  }

  _removeAlert(item) {
    // const { removeAlert } = this.props;
    console.log('>>', this, item);
    // removeAlert();
  }

  _renderItem({ item }) {
    const { _removeAlert } = this;
    // const { popupDialog: { show } } = this;

    // console.log('renderItem>>>>', item, _removeAlert, this);
    return (
      <AlertListItem
        alert={item}
        onPress={_removeAlert}
      />
    );
  }

  render() {
    const { _renderItem, dialog } = this;
    const { alerts } = this.props;

    return (
      <View style={STYLE.SCREEN}>
        <Button
          title="Show Dialog"
          onPress={() => dialog.show()}
        />
        <PopupDialog
          dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
          ref={(popupDialog) => { this.dialog = popupDialog; }}
        >
          <View>
            <Text>Hello world</Text>
          </View>
        </PopupDialog>

        <FlatList data={alerts} keyExtractor={keyExtractor} renderItem={_renderItem} />
      </View>
    );
  }
}

AlertsScreen.propTypes = {
  addAlert: func,
  alerts: arrayOf(C.SHAPE.ALERT),
  removeAlert: func,
};

AlertsScreen.defaultProps = {
  addAlert() {},
  alerts: [],
  removeAlert() {},
};

const mapStateToProps = state => ({
  alerts: state.alerts,
});

const mapDispatchToProps = dispatch => ({
  addAlert: alert => dispatch(addAlertAction(alert)),
  removeAlert: alert => dispatch(removeAlertAction(alert)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertsScreen);
