import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Linking, Text, View } from 'react-native';
import PKG from '../../../package.json';
import { updateSettingsAction } from '../../actions';
import { ButtonIcon, Touchable } from '../../components';
import { ASSET, C, SHAPE, STYLE, TEXT } from '../../config';
import { ModalCurrency } from './components';
import styles from './Settings.style';

const { CURRENCY: { USD }, SOHOBASE } = C;
const { name, version } = PKG;
const { NAVIGATION, SETTINGS } = SHAPE;
const { EN: { COPYRIGHT, LANGUAGE, LOCAL_CURRENCY } } = TEXT;

const onClickSohobase = () => Linking.openURL(SOHOBASE.URL);

class Settings extends Component {
  static navigationOptions({ navigation: { navigate } }) {
    return {
      // headerLeft: <Hodl />,
      title: 'Settings',
      headerRight: <ButtonIcon icon="add" onPress={() => navigate('Currencies')} style={styles.icon} />,
    };
  }

  constructor(props) {
    super(props);
    this.state = { modal: false };
    this._onCurrency = this._onCurrency.bind(this);
    this._onModal = this._onModal.bind(this);
  }

  _onCurrency(currency) {
    this.setState({ modal: false });
    this.props.updateSettings({ currency });
  }

  _onModal() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const {
      _onCurrency, _onModal,
      props: { settings: { currency = USD, language = 'English' } },
      state: { modal },
    } = this;

    return (
      <View style={STYLE.SCREEN}>
        <View style={[STYLE.CENTERED, styles.content]}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.text}>v{version}</Text>
        </View>
        <View style={styles.form}>
          <Touchable onPress={_onModal} style={[STYLE.LIST_ITEM, styles.fieldset]}>
            <Text style={styles.label}>{LOCAL_CURRENCY}</Text>
            <Text style={styles.value}>{currency}</Text>
          </Touchable>
          <View style={[STYLE.LIST_ITEM, styles.fieldset]}>
            <Text style={styles.label}>{LANGUAGE}</Text>
            <Text style={[styles.value, styles.disabled]}>{language}</Text>
          </View>
        </View>
        <View style={[STYLE.CENTERED, styles.content]}>
          <Image onPress={onClickSohobase} style={styles.sohobase} source={ASSET.sohobase} />
          <Text style={styles.text}>❤️</Text>
          <Text style={styles.text}>{COPYRIGHT}</Text>
        </View>
        <ModalCurrency onClose={_onModal} onValue={_onCurrency} visible={modal} />
      </View>
    );
  }
}

Settings.propTypes = {
  navigation: shape(NAVIGATION),
  settings: shape(SETTINGS),
  updateSettings: func,
};

Settings.defaultProps = {
  navigation: {
    navigate() {},
  },
  settings: {},
  updateSettings() {},
};

const mapStateToProps = ({ settings = {} }) => ({
  settings,
});

const mapDispatchToProps = dispatch => ({
  updateSettings: settings => dispatch(updateSettingsAction(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
