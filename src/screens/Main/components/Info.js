import { LinearGradient } from 'expo';
import { shape } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Amount, ButtonIcon, Touchable } from '../../../components';
import { SHAPE, STYLE, THEME } from '../../../config';
import Chart from './Chart';
import ModalHodl from './ModalHodl';
import styles from './Info.style';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this._onModal = this._onModal.bind(this);
  }

  _onModal() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const {
      _onModal,
      props: { coin, navigation: { navigate }, settings: { nightMode } },
      state: { modal },
    } = this;
    const {
      hodl = 0, name, price = 0, trend = 0,
    } = coin;
    const trendPercentage = parseInt((trend * 100) / price, 10);

    return (
      <LinearGradient colors={nightMode ? [THEME.COLOR.BLACK, THEME.COLOR.BLACK] : THEME.GRADIENT_INFO} style={styles.container}>
        <View style={[STYLE.ROW, styles.header]}>
          <Touchable onPress={_onModal} style={styles.coin}>
            <View style={styles.coin}>
              <View style={STYLE.ROW}>
                <Text style={[styles.text, styles.name]}>{name}</Text>
                { trendPercentage !== 0 &&
                  <View style={[STYLE.CHIP]}>
                    <Amount style={[styles.text, styles.trend]} symbol="%" value={trendPercentage} />
                  </View>}
              </View>
              <Text style={[styles.text, styles.hodl]}>
                { hodl > 0 ? `${hodl} ${coin.coin}` : 'Tap for set your holdings' }
              </Text>
            </View>
          </Touchable>
          <ButtonIcon icon="alert" onPress={() => navigate('Alerts', { coin })} style={styles.button} />
        </View>
        <Chart coin={coin} />
        <ModalHodl coin={coin} onClose={_onModal} visible={modal} />
      </LinearGradient>
    );
  }
}

Info.propTypes = {
  coin: shape(SHAPE.COIN),
  navigation: shape(SHAPE.NAVIGATION).isRequired,
  settings: shape(SHAPE.SETTINGS).isRequired,
};

Info.defaultProps = {
  coin: {},
};

const mapStateToProps = ({ favorites, settings }, { coin }) => ({
  coin: favorites.find(item => item.coin === coin),
  settings,
});

export default connect(mapStateToProps)(Info);
