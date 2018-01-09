import { shape } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { snapshotsAction } from '../../../actions';
import { ButtonIcon } from '../../../components';
import { C, SHAPE, STYLE } from '../../../config';
import { ServiceCoins } from '../../../services';
import Chart from './Chart';
import ModalHodl from './ModalHodl';
import styles from './Info.style';

const { DEFAULT: { TIMELINE } } = C;

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      history: undefined,
      modal: false,
      timeline: TIMELINE,
    };
    this._onModal = this._onModal.bind(this);
    this._onTimeline = this._onTimeline.bind(this);
  }

  async componentWillReceiveProps({ coin: { coin } }) {
    const { props: { coin: { coin: previousCoin }, settings: { currency }, snapshots } } = this;

    if (previousCoin !== coin) {
      this.setState({ fetching: true, history: undefined, timeline: TIMELINE });
      const history = await ServiceCoins.history(coin, TIMELINE, currency);
      if (history) snapshots({ history }, coin);
      this.setState({ fetching: false, history });
    }
  }

  _onModal() {
    this.setState({ modal: !this.state.modal });
  }

  async _onTimeline(timeline) {
    const { coin: { coin }, settings: { currency } } = this.props;

    this.setState({ fetching: true, timeline });
    this.setState({
      fetching: false,
      history: await ServiceCoins.history(coin, timeline, currency),
    });
  }

  render() {
    const {
      _onModal, _onTimeline,
      props: { coin, navigation: { navigate }, snapshot },
      state: {
        fetching, history = snapshot.history || [], modal, timeline,
      },
    } = this;

    return (
      <View style={styles.container}>
        <View style={[STYLE.ROW, styles.header]}>
          <View style={styles.coin}>
            <Text style={[styles.text, styles.name]}>{coin.name}</Text>
            { coin.hodl && <Text style={[styles.text, styles.hodl]}>{`${coin.hodl} ${coin.coin}`}</Text> }
          </View>
          <ButtonIcon icon="alert" onPress={() => navigate('Alerts', { coin })} style={styles.button} />
          <ButtonIcon icon="settings" onPress={_onModal} style={styles.button} />
        </View>
        <Chart coin={coin} dataSource={history} fetching={fetching} onTimeline={_onTimeline} timeline={timeline} />
        <ModalHodl coin={coin} onClose={_onModal} visible={modal} />
      </View>
    );
  }
}

Info.propTypes = {
  coin: shape(SHAPE.COIN),
  navigation: shape(SHAPE.NAVIGATION).isRequired,
  snapshot: shape(SHAPE.SNAPSHOT),
};

Info.defaultProps = {
  coin: {},
  snapshot: {},
};

const mapStateToProps = ({ settings, snapshots = {} }, { coin: { coin } = {} }) => ({
  settings,
  snapshot: snapshots[coin] || {},
});

const mapDispatchToProps = dispatch => ({
  snapshots: (data, coin) => data && coin && dispatch(snapshotsAction(data, coin)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);
