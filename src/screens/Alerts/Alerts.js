import { arrayOf, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState, FlatList, RefreshControl, View } from 'react-native';
import { saveAlertsAction } from '../../actions';
import { ButtonIcon } from '../../components';
import { SHAPE, STYLE, THEME } from '../../config';
import { ModalAlert } from '../../containers';
import { ServiceAlerts } from '../../services';
import { AlertListItem } from './components';

const { ALERT, COIN, NAVIGATION } = SHAPE;

const keyExtractor = ({ coin, low, high }) => `${coin}${low}${high}${new Date()}`;

class AlertsScreen extends Component {
  static navigationOptions({ navigation: { state } }) {
    const { coin: { name }, _showAlert } = state.params || {};

    return {
      title: `${name} Alerts`,
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
    const { _fetch } = this;

    _fetch();
    AppState.addEventListener('change', state => state === 'active' && _fetch());
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
    await ServiceAlerts.get(token).then(saveAlerts);
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
    const { alerts, coin } = this.props;
    const {
      alert, modal, prefetch, refreshing,
    } = this.state;

    return (
      <View style={STYLE.SCREEN}>
        <FlatList
          data={alerts}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl refreshing={refreshing && prefetch} onRefresh={_fetch} tintColor={THEME.WHITE} />}
          renderItem={_renderItem}
        />
        <ModalAlert alert={alert} coin={coin} onClose={_closeAlert} visible={modal} />
      </View>
    );
  }
}

AlertsScreen.propTypes = {
  alerts: arrayOf(shape(ALERT)),
  coin: shape(COIN),
  navigation: shape(NAVIGATION),
  token: string,
};

AlertsScreen.defaultProps = {
  alerts: [],
  coin: undefined,
  navigation: undefined,
  token: undefined,
};

const mapStateToProps = ({ alerts = [], token }, props) => {
  const { coin = {} } = props.navigation.state.params;

  return {
    alerts: alerts.filter(item => coin.coin === item.coin),
    coin,
    token,
  };
};

const mapDispatchToProps = dispatch => ({
  saveAlerts: alerts => alerts && dispatch(saveAlertsAction(alerts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertsScreen);
