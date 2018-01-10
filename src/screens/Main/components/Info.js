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
    this._fetch = this._fetch.bind(this);
    this._onModal = this._onModal.bind(this);
    this._onTimeline = this._onTimeline.bind(this);
  }

  componentWillMount() {
    const { _fetch, props: { coin: { coin } } } = this;
    _fetch(coin, TIMELINE);
  }

  componentWillReceiveProps({ coin: { coin } }) {
    const {
      _fetch,
      props: { coin: { coin: previousCoin } },
      state: { timeline },
    } = this;

    if (previousCoin !== coin) _fetch(coin, timeline);
  }

  async _fetch(coin, timeline) {
    const { props: { settings: { currency } } } = this;

    this.setState({ fetching: true, timeline });
    this.setState({
      fetching: false,
      history: await ServiceCoins.history(coin, timeline, currency),
    });
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
      props: { coin, navigation: { navigate } },
      state: {
        fetching, history = [], modal, timeline,
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
          <ButtonIcon icon="wallet" onPress={_onModal} style={styles.button} />
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
};

Info.defaultProps = {
  coin: {},
};

const mapStateToProps = ({ settings }) => ({
  settings,
});

export default connect(mapStateToProps)(Info);
