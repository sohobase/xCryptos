import { LinearGradient } from 'expo';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';
import { Amount } from '../../../components';
import { C, SHAPE, STYLE, THEME } from '../../../config';
import Chart from './Chart';
import ChipPrice from './ChipPrice';
import TimelineOption from './TimelineOption';
import styles from './CoinInfo.style';

const { SYMBOL } = C;
const { COIN, HISTORY, SETTINGS } = SHAPE;
const { MOTION } = THEME;

class CoinInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { price: undefined };
    this._onValue = this._onValue.bind(this);
  }

  _onValue(price) {
    this.setState({ price });
  }

  render() {
    const {
      _onValue,
      props: {
        history, onTimeline, fetching, timeline,
      },
      state: { price = this.props.coin.price },
    } = this;

    let high = 0;
    let low = 0;
    if (!fetching && history.length > 0) {
      high = Math.max.apply(null, history.map(({ value }) => value));
      low = Math.min.apply(null, history.map(({ value }) => value));
    }

    return (
      <LinearGradient colors={THEME.GRADIENT} style={[STYLE.LAYOUT_MAIN, styles.container]}>
        <View style={styles.prices}>
          <ChipPrice price={price} icon="up" value={high} />
          <Motion {...MOTION.DEFAULT} delay={300}>
            <Amount value={price} style={styles.price} />
          </Motion>
          <ChipPrice price={price} icon="down" value={low} />
        </View>
        <View style={STYLE.ROW}>
          {
            C.TIMELINES.map(key => (
              <TimelineOption
                active={key === timeline}
                caption={key}
                key={key}
                onPress={() => !fetching && onTimeline(key)}
              />
            ))
          }
        </View>
        <Chart dataSource={history} fetching={fetching} onValue={_onValue} />
      </LinearGradient>
    );
  }
}

CoinInfo.propTypes = {
  coin: shape(COIN).isRequired,
  history: arrayOf(shape(HISTORY)),
  onTimeline: func,
  fetching: bool,
  settings: shape(SETTINGS),
  timeline: string,
};

CoinInfo.defaultProps = {
  history: [],
  onTimeline: undefined,
  fetching: false,
  settings: {},
  timeline: undefined,
};

const mapStateToProps = ({ settings }) => ({
  settings,
});

export default connect(mapStateToProps)(CoinInfo);
