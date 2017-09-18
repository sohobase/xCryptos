import { arrayOf, func, string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, RefreshControl, View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import { addAlertAction, removeAlertAction, saveAlertsAction } from '../actions';
import { C, STYLE, THEME } from '../config';
import { ServiceAlerts } from '../services';
import { AlertListItem, Button, ButtonIcon, Modal } from '../components';
import styles from './AlertsScreen.style';

const keyExtractor = ({ currency, low, high }) => `${currency}${low}${high}${new Date()}`;

class AlertsScreen extends Component {
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
      modal: false,
      prefetch: false,
      refreshing: false,
    };
    this._closeAlert = this._closeAlert.bind(this);
    this._fetch = this._fetch.bind(this);
    this._onChangeAmount = this._onChangeAmount.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._saveAlert = this._saveAlert.bind(this);
    this._showAlert = this._showAlert.bind(this);
  }

  componentWillMount() {
    this._fetch();
  }

  componentDidMount() {
    const { _showAlert } = this;
    const { navigation } = this.props;

    navigation.setParams({ _showAlert });
  }

  _closeAlert() {
    this.setState({ modal: false, item: undefined });
  }

  async _saveAlert() {
    const { _closeAlert } = this;
    const { addAlert, removeAlert, currency: { symbol }, token } = this.props;
    const { item = {} } = this.state;

    if (item.currency) removeAlert(await ServiceAlerts.remove(item));
    else addAlert(await ServiceAlerts.add({ ...item, currency: symbol, token }));
    _closeAlert();
  }

  async _fetch() {
    const { saveAlerts, token } = this.props;

    this.setState({ refreshing: true });
    saveAlerts(await ServiceAlerts.get(token));
    this.setState({ prefetch: true, refreshing: false });
  }

  _showAlert(item) {
    this.setState({ item, modal: item === undefined });
  }

  _onChangeAmount(field, value) {
    const { item = {} } = this.state;

    this.setState({
      item: { ...item, [field]: parseFloat(value) },
    });
  }

  _renderItem({ item }) {
    const { _showAlert } = this;
    return (
      <AlertListItem alert={item} onPress={() => _showAlert(item)} />
    );
  }

  render() {
    const { _closeAlert, _fetch, _onChangeAmount, _renderItem, _saveAlert } = this;
    const { alerts } = this.props;
    const { item, modal, prefetch, refreshing } = this.state;
    const { low, high } = item || {};

    const inputProps = {
      containerStyle: styles.fieldReset,
      keyboardType: 'numeric',
      underlineColorAndroid: THEME.PRIMARY,
    };

    return (
      <View style={STYLE.SCREEN}>
        <FlatList
          data={alerts}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl refreshing={refreshing && prefetch} onRefresh={_fetch} tintColor={THEME.WHITE} />}
          renderItem={_renderItem}
        />

        <Modal
          title={`${modal ? 'New' : 'Edit'} alert`}
          onClose={_closeAlert}
          visible={modal || item !== undefined}
        >
          <View style={[STYLE.ROW]}>
            <View style={styles.fieldset}>
              <FormLabel labelStyle={[styles.fieldReset]}>Low</FormLabel>
              <FormInput
                autoFocus={modal}
                defaultValue={item && low && low.toString()}
                inputStyle={styles.input}
                onChangeText={_onChangeAmount.bind(null, 'low')} //eslint-disable-line
                {...inputProps}
              />
            </View>
            <View style={styles.fieldset}>
              <FormLabel labelStyle={[styles.fieldReset, styles.labelRight]}>High</FormLabel>
              <FormInput
                defaultValue={item && high && high.toString()}
                inputStyle={[styles.input, styles.inputRight]}
                onChangeText={_onChangeAmount.bind(null, 'high')} //eslint-disable-line
                {...inputProps}
              />
            </View>
          </View>
          <Button
            caption={item && item.currency ? 'Delete' : 'Save'}
            disabled={!low || !high}
            onPress={() => { _saveAlert(); }}
            style={[STYLE.MODAL_BUTTON, styles.modalButton]}
          />
        </Modal>
      </View>
    );
  }
}

AlertsScreen.propTypes = {
  addAlert: func,
  alerts: arrayOf(C.SHAPE.ALERT),
  currency: C.SHAPE.CURRENCY,
  navigation: C.SHAPE.NAVIGATION,
  removeAlert: func,
  token: string,
};

AlertsScreen.defaultProps = {
  addAlert() {},
  alerts: [],
  currency: undefined,
  navigation: undefined,
  removeAlert() {},
  token: undefined,
};

const mapStateToProps = ({ alerts = [], token }, props) => {
  const { currency = {} } = props.navigation.state.params;

  return {
    alerts: alerts.filter(item => currency.symbol === item.currency),
    currency,
    token,
  };
};

const mapDispatchToProps = dispatch => ({
  addAlert: alert => dispatch(addAlertAction(alert)),
  removeAlert: alert => dispatch(removeAlertAction(alert)),
  saveAlerts: alerts => dispatch(saveAlertsAction(alerts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertsScreen);
