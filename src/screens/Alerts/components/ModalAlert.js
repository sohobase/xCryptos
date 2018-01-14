import { bool, func, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { addAlertAction, removeAlertAction } from '../../../actions';
import { Amount, Button, Input, Modal } from '../../../components';
import { SHAPE, STYLE } from '../../../config';
import { ServiceAlerts } from '../../../services';
import styles from './ModalAlert.style';

const { ALERT, COIN, SETTINGS } = SHAPE;

const Fieldset = ({
  label, disabled, onChange, price, right, value = 0, // eslint-disable-line
}) => (
  <View style={[styles.fieldset, right && styles.alignRight]}>
    <View style={STYLE.ROW}>
      <Text style={styles.label}>{label}</Text>
      {
        value > 0 &&
        <Text style={[styles.label, styles.percent]}>
          {` (${parseInt(((value * 100) / price) - 100, 10)}%)`}
        </Text>
      }
    </View>
    {
      disabled
      ?
        <Amount style={styles.input} value={value} />
      :
        <Input
          autoFocus={label === 'low'}
          defaultValue={value ? value.toString() : undefined}
          onChangeText={newValue => onChange(label, newValue)}
          style={[styles.input, right && styles.inputRight]}
        />
    }
  </View>
);

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
      props: {
        addAlert, alert, removeAlert, onClose, token,
        coin: { coin },
        settings: { currency },
      },
      state: {
        item: { low, high } = {},
      },
    } = this;

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
    const {
      _onChange, _onSubmit,
      props: {
        alert, coin: { price }, onClose, visible,
      },
      state: {
        item: { low, high } = alert || {}, refreshing,
      },
    } = this;
    const invalid = !alert && (!low || !high || low > price || high < price);

    return (
      <Modal title={!alert ? 'New Alert' : 'Alert'} onClose={onClose} visible={visible}>
        <View style={[STYLE.CENTERED, STYLE.LIST_ITEM, styles.content]}>
          <Amount style={styles.price} value={price} />
        </View>
        <View style={[STYLE.ROW, STYLE.LIST_ITEM, styles.content]}>
          <Fieldset disabled={alert} label="low" onChange={_onChange} value={low} price={price} />
          <Fieldset disabled={alert} label="high" onChange={_onChange} right value={high} price={price} />
        </View>
        <View style={STYLE.MODAL_FOOTER}>
          <Button
            caption={alert ? 'Delete' : 'Create'}
            disabled={invalid || refreshing}
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
  coin: shape(COIN).isRequired,
  onClose: func,
  removeAlert: func,
  settings: shape(SETTINGS),
  token: string,
  visible: bool,
};

ModalAlert.defaultProps = {
  addAlert() {},
  alert: undefined,
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
