import { bool, func, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addAlertAction, removeAlertAction } from '../../../actions';
import { Amount, Button, Input, Modal } from '../../../components';
import { SHAPE, STYLE } from '../../../config';
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

    return (
      <Modal title={alert ? 'Alert' : 'New Alert'} onClose={onClose} visible={visible}>
        <View style={[STYLE.CENTERED, STYLE.LIST_ITEM, styles.content]}>
          <Amount style={styles.price} value={price} />
        </View>
        <View style={[STYLE.ROW, STYLE.LIST_ITEM, styles.content]}>
          <Input
            autoFocus
            defaultValue={item && low ? low.toString() : undefined}
            editable={!alert}
            placeholder="low"
            style={styles.input}
            onChangeText={_onChange.bind(null, 'low')} //eslint-disable-line
          />
          <Input
            defaultValue={item && high ? high.toString() : undefined}
            editable={!alert}
            placeholder="high"
            style={[styles.input, styles.inputRight]}
            onChangeText={_onChange.bind(null, 'high')} //eslint-disable-line
          />
        </View>
        <View style={STYLE.MODAL_FOOTER}>
          <Button
            caption={item && item.coin ? 'Delete' : 'Create'}
            disabled={(!alert && (!low || !high || low > price || high < price)) || refreshing}
            onPress={_onSubmit}
            style={styles.button}
          />
        </View>
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
