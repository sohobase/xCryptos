import { bool, func, string } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel, FormInput } from 'react-native-elements';
import { addAlertAction, removeAlertAction } from '../actions';
import { C, STYLE, THEME } from '../config';
import { ServiceAlerts } from '../services';
import Button from './Button';
import ButtonIcon from './ButtonIcon';
import Modal from './Modal';
import styles from './ModalAlert.style';

class ModalAlert extends Component {
  static navigationOptions({ navigation: { state } }) {
    const { currency = {}, _showAlert } = state.params || {};

    return {
      title: `${currency.name} Alerts`,
      headerRight: <ButtonIcon icon="add" onPress={() => { _showAlert(); }} />,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      item: undefined,
      refreshing: false,
    };
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ item: undefined });
  }

  _onChange(field, value) {
    const { item = {} } = this.state;

    this.setState({
      item: { ...item, [field]: parseFloat(value) },
    });
  }

  async _onSubmit() {
    const { addAlert, alert, removeAlert, currency: { symbol }, onClose, token } = this.props;
    const { item = {} } = this.state;

    this.setState({ refreshing: true });
    if (alert) removeAlert(await ServiceAlerts.remove(alert));
    else addAlert(await ServiceAlerts.add({ ...item, currency: symbol, token }));
    this.setState({ refreshing: false });
    onClose();
  }

  render() {
    const { _onChange, _onSubmit } = this;
    const { alert, currency: { symbol, usd }, onClose, visible } = this.props;
    const { item = alert, refreshing } = this.state;
    const { low, high } = item || {};

    const inputProps = {
      containerStyle: styles.fieldReset,
      keyboardType: 'numeric',
      underlineColorAndroid: THEME.PRIMARY,
    };

    return (
      <Modal
        title={alert ? 'Alert' : 'New Alert'}
        onClose={onClose}
        visible={visible}
      >
        <View style={[STYLE.CENTERED, STYLE.ROW]}>
          <Text style={styles.symbol}>$</Text>
          <Text style={styles.price}>{usd}</Text>
          <View style={[STYLE.CHIP, styles.chip]}>
            <Text style={styles.chipCaption}>{symbol}</Text>
          </View>
        </View>
        <View style={[STYLE.ROW]}>
          <View style={styles.fieldset}>
            <FormLabel labelStyle={[styles.fieldReset]}>Low</FormLabel>
            <FormInput
              autoFocus={!alert}
              defaultValue={item && low && low.toString()}
              inputStyle={styles.input}
              onChangeText={_onChange.bind(null, 'low')} //eslint-disable-line
              {...inputProps}
            />
          </View>
          <View style={styles.fieldset}>
            <FormLabel labelStyle={[styles.fieldReset, styles.labelRight]}>High</FormLabel>
            <FormInput
              defaultValue={item && high && high.toString()}
              inputStyle={[styles.input, styles.inputRight]}
              onChangeText={_onChange.bind(null, 'high')} //eslint-disable-line
              {...inputProps}
            />
          </View>
        </View>
        <Button
          caption={item && item.currency ? 'Delete' : 'Create'}
          disabled={!low || !high || refreshing}
          onPress={() => { _onSubmit(); }}
          style={[STYLE.MODAL_BUTTON, styles.modalButton]}
        />
      </Modal>
    );
  }
}

ModalAlert.propTypes = {
  addAlert: func,
  alert: C.SHAPE.ALERT,
  currency: C.SHAPE.CURRENCY,
  visible: bool,
  onClose: func,
  removeAlert: func,
  token: string,
};

ModalAlert.defaultProps = {
  addAlert() {},
  alert: undefined,
  currency: undefined,
  visible: false,
  onClose() {},
  removeAlert() {},
  token: undefined,
};

const mapStateToProps = state => ({
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  addAlert: alert => dispatch(addAlertAction(alert)),
  removeAlert: alert => dispatch(removeAlertAction(alert)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalAlert);
