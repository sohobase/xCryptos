import { arrayOf, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Image, Linking, Switch, Text, View } from 'react-native';

import PKG from '../../../package.json';
import { updatePricesAction, updateSettingsAction } from '../../actions';
import { ButtonIcon, Touchable } from '../../components';
import { ASSET, C, SHAPE, STYLE, TEXT, THEME } from '../../config';
import { ServiceCoins } from '../../services';
import { FieldsetSwitch, ModalCurrency } from './components';
import styles from './Settings.style';

const { CURRENCY: { USD }, SOHOBASE } = C;
const { version } = PKG;
const {
  EN: {
    COPYRIGHT, LOCAL_CURRENCY, NIGHT_MODE, THEME: TEXT_THEME,
  },
} = TEXT;

class Settings extends Component {
  static navigationOptions({ navigation: { navigate } }) {
    return {
      title: 'Settings',
      headerRight: <ButtonIcon icon="add" onPress={() => navigate('Coins')} />,
      headerStyle: { backgroundColor: THEME.WHITE },
      headerTintColor: THEME.BLACK,
    };
  }

  constructor(props) {
    super(props);
    this.state = { modal: false };
    this._onCurrency = this._onCurrency.bind(this);
    this._onModal = this._onModal.bind(this);
    this._onNightMode = this._onNightMode.bind(this);
  }

  _onCurrency(currency) {
    const { props: { favorites, updatePrices, updateSettings } } = this;
    this.setState({ modal: false });
    updateSettings({
      currency,
      // locale: (await Util.getCurrentLocaleAsync()).toUpperCase(), @TODO: Available when change language
    });
    ServiceCoins.prices(favorites.map(({ coin }) => coin), currency).then(updatePrices);
  }

  _onNightMode(nightMode) {
    const { props: { navigation, updateSettings } } = this;
    updateSettings({ nightMode });
    navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Main' })],
    }));
  }

  _onModal() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const {
      _onCurrency, _onModal, _onNightMode,
      props: { settings: { currency = USD, nightMode = false } },
      state: { modal },
    } = this;

    return (
      <View style={STYLE.SCREEN}>
        <View style={[STYLE.CENTERED, styles.content]}>
          <Image style={styles.brandname} source={ASSET.brandname} />
          <Text style={styles.text}>v{version}</Text>
        </View>
        <View style={styles.form}>
          <Touchable onPress={_onModal}>
            <View style={STYLE.LIST_ITEM}>
              <Text style={styles.label}>{LOCAL_CURRENCY}</Text>
              <Text style={styles.value}>{currency}</Text>
            </View>
          </Touchable>
          <FieldsetSwitch caption={NIGHT_MODE} label={TEXT_THEME} onChange={_onNightMode} value={nightMode} />
        </View>
        <View style={[STYLE.CENTERED, styles.content]}>
          <Image
            onPress={() => Linking.openURL(SOHOBASE.URL)}
            style={styles.sohobase}
            source={ASSET.sohobase}
          />
          <Text style={styles.text}>❤️</Text>
          <Text style={styles.text}>{COPYRIGHT}</Text>
        </View>
        <ModalCurrency onClose={_onModal} onValue={_onCurrency} visible={modal} />
      </View>
    );
  }
}

Settings.propTypes = {
  favorites: arrayOf(shape(SHAPE.FAVORITE)),
  navigation: shape(SHAPE.NAVIGATION).isRequired,
  settings: shape(SHAPE.SETTINGS),
  updatePrices: func,
  updateSettings: func,
};

Settings.defaultProps = {
  favorites: [],
  settings: {},
  updatePrices() {},
  updateSettings() {},
};

const mapStateToProps = ({ favorites, settings = {} }) => ({
  favorites,
  settings,
});

const mapDispatchToProps = dispatch => ({
  updatePrices: prices => prices && dispatch(updatePricesAction(prices)),
  updateSettings: settings => dispatch(updateSettingsAction(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
