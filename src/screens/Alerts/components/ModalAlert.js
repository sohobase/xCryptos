import { bool, func, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel, FormInput } from 'react-native-elements';
import { addAlertAction, removeAlertAction } from '../../../actions';
import { Amount, Button, Modal } from '../../../components';
import { SHAPE, STYLE, THEME } from '../../../config';
import { ServiceAlerts } from '../../../services';
import styles from './ModalAlert.style';

const { ALERT, COIN, SETTINGS } = SHAPE;

class ModalAlert extends Component {
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
    const {
      addAlert, alert, removeAlert, coin: { coin }, onClose, settings: { currency }, token,
    } = this.props;
    const { item: { low, high } = {} } = this.state;

    this.setState({ refreshing: true });
    if (alert) {
      await ServiceAlerts.remove(alert).then(removeAlert);
    } else {
      await ServiceAlerts.add({
        coin, currency, low, high, token,
      }).then(addAlert);
    }
    this.setState({ refreshing: false });
    onClose();
  }

  render() {
    const { _onChange, _onSubmit } = this;
    const {
      alert, coin: { price }, onClose, visible,
    } = this.props;
    const { item = alert, refreshing } = this.state;
    const { low, high } = item || {};

    const inputProps = {
      containerStyle: styles.fieldReset,
      keyboardType: 'numeric',
      underlineColorAndroid: THEME.PRIMARY,
    };

    return (
      <Modal title={alert ? 'Alert' : 'New Alert'} onClose={onClose} visible={visible}>
        <View style={STYLE.CENTERED}>
          <Amount style={styles.price} value={price} />
        </View>
        <View style={[STYLE.ROW, styles.content]}>
          <View style={styles.fieldset}>
            <FormLabel labelStyle={[styles.fieldReset]}>Low</FormLabel>
            <FormInput
              autoFocus
              defaultValue={item && low && low.toString()}
              editable={!alert}
              inputStyle={styles.input}
              onChangeText={_onChange.bind(null, 'low')} //eslint-disable-line
              {...inputProps}
            />
          </View>
          <View style={styles.fieldset}>
            <FormLabel labelStyle={[styles.fieldReset, styles.labelRight]}>High</FormLabel>
            <FormInput
              defaultValue={item && high && high.toString()}
              editable={!alert}
              inputStyle={[styles.input, styles.inputRight]}
              onChangeText={_onChange.bind(null, 'high')} //eslint-disable-line
              {...inputProps}
            />
          </View>
        </View>
        <Button
          caption={item && item.coin ? 'Delete' : 'Create'}
          disabled={(!alert && (!low || !high || low > price || high < price)) || refreshing}
          onPress={() => { _onSubmit(); }}
          style={[STYLE.MODAL_BUTTON, styles.modalButton]}
        />
      </Modal>
    );
  }
}

ModalAlert.propTypes = {
  addAlert: func,
  alert: shape(ALERT),
  coin: shape(COIN),
  onClose: func,
  removeAlert: func,
  settings: shape(SETTINGS),
  token: string,
  visible: bool,
};

ModalAlert.defaultProps = {
  addAlert() {},
  alert: undefined,
  coin: undefined,
  onClose() {},
  removeAlert() {},
  settings: {},
  token: undefined,
  visible: false,
};

const mapStateToProps = ({ settings, token }) => ({
  settings,
  token,
});

const mapDispatchToProps = dispatch => ({
  addAlert: alert => alert && dispatch(addAlertAction(alert)),
  removeAlert: alert => alert && dispatch(removeAlertAction(alert)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalAlert);
