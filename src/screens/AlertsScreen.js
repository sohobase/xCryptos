import { arrayOf, string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, RefreshControl, View } from 'react-native';
import { saveAlertsAction } from '../actions';
import { C, STYLE, THEME } from '../config';
import { ServiceAlerts } from '../services';
import { AlertListItem, ButtonIcon, ModalAlert } from '../components';

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
      alert: undefined,
      modal: false,
      prefetch: false,
      refreshing: false,
    };
    this._closeAlert = this._closeAlert.bind(this);
    this._fetch = this._fetch.bind(this);
    this._renderItem = this._renderItem.bind(this);
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
    this.setState({ modal: false, alert: undefined });
  }

  async _fetch() {
    const { saveAlerts, token } = this.props;

    this.setState({ refreshing: true });
    saveAlerts(await ServiceAlerts.get(token));
    this.setState({ prefetch: true, refreshing: false });
  }

  _showAlert(alert) {
    this.setState({ alert, modal: true });
  }

  _renderItem({ item }) {
    const { _showAlert } = this;
    return (
      <AlertListItem alert={item} onPress={() => _showAlert(item)} />
    );
  }

  render() {
    const { _closeAlert, _fetch, _renderItem } = this;
    const { alerts, currency } = this.props;
    const { alert, modal, prefetch, refreshing } = this.state;

    return (
      <View style={STYLE.SCREEN}>
        <FlatList
          data={alerts}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl refreshing={refreshing && prefetch} onRefresh={_fetch} tintColor={THEME.WHITE} />}
          renderItem={_renderItem}
        />
        <ModalAlert alert={alert} currency={currency} onClose={_closeAlert} visible={modal} />
      </View>
    );
  }
}

AlertsScreen.propTypes = {
  alerts: arrayOf(C.SHAPE.ALERT),
  currency: C.SHAPE.CURRENCY,
  navigation: C.SHAPE.NAVIGATION,
  token: string,
};

AlertsScreen.defaultProps = {
  alerts: [],
  currency: undefined,
  navigation: undefined,
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
  saveAlerts: alerts => dispatch(saveAlertsAction(alerts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertsScreen);
