import { shape } from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';
import { Touchable } from '../../../components';
import { C, SHAPE, STYLE, THEME } from '../../../config';
import { ServiceCoins } from '../../../services';
import styles from './Chart.style';
import ChipPrice from './ChipPrice';

const { DEFAULT: { TIMELINE }, TIMELINES } = C;
const { MOTION, COLOR } = THEME;

const Option = ({
  active, caption, onPress, // eslint-disable-line
}) => (
  <Touchable onPress={onPress}>
    <View style={[STYLE.CHIP, STYLE.ROW, styles.option, (active && styles.active)]}>
      <Text style={[styles.caption, (active && styles.captionActive)]}>{caption}</Text>
    </View>
  </Touchable>
);

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      dataSource: undefined,
      price: undefined,
      timeline: TIMELINE,
      timestamp: undefined,
    };
    this._fetch = this._fetch.bind(this);
    this._onTimeline = this._onTimeline.bind(this);
    this._onValue = this._onValue.bind(this);
  }

  componentDidMount() {
    this._fetch();
  }

  componentWillReceiveProps({ coin: { coin } }) {
    const {
      _fetch,
      props: { coin: { coin: previousCoin } },
    } = this;

    if (previousCoin !== coin) _fetch({ coin });
  }

  async _fetch({ coin = this.props.coin.coin, timeline = this.state.timeline } = {}) {
    const { props: { settings: { currency } } } = this;

    this.setState({ fetching: true, timeline });
    this.setState({
      fetching: false,
      dataSource: await ServiceCoins.history(coin, timeline, currency),
      timestamp: (new Date()).getTime(),
    });
  }

  _onTimeline(timeline) {
    this._fetch({ timeline });
  }

  _onValue(price) {
    this.setState({ price });
  }

  render() {
    const {
      _onValue, _onTimeline,
      props: { coin },
      state: {
        fetching, dataSource = [], price = coin.price, timeline, timestamp,
      },
    } = this;

    let max = 0;
    let min = 0;
    let trend;
    if (!fetching && dataSource.length > 0) {
      max = Math.max.apply(null, dataSource.map(({ value }) => value));
      min = Math.min.apply(null, dataSource.map(({ value }) => value));
      trend = (dataSource.find(({ value }) => value === max || value === min)).value === max;
    }
    const diff = max - min;

    return (
      <View style={styles.container}>
        <View style={[STYLE.ROW, styles.prices, trend && styles.reverse]}>
          <ChipPrice context="low" price={price} value={min} />
          <View style={styles.space} />
          <ChipPrice context="high" price={price} value={max} />
        </View>
        <View style={[STYLE.ROW, styles.bars]}>
          {
            dataSource.map(({ value }, index) => {
              let color = COLOR.CHART;
              if (value === min) color = COLOR.RED;
              if (value === max) color = COLOR.GREEN;
              const key = `${timeline}-${timestamp}-${index}`;
              const height = fetching ? 0 : ((value - min) * 100) / diff;

              return (
                <TouchableOpacity
                  key={key}
                  onPressIn={() => _onValue(value)}
                  onPressOut={() => _onValue()}
                  style={styles.bar}
                >
                  <Motion
                    {...MOTION.DEFAULT}
                    delay={index * 5}
                    style={[styles.value, { height: `${height}%`, backgroundColor: color }]}
                  />
                </TouchableOpacity>
              );
            })
          }
        </View>
        <View style={STYLE.ROW}>
          {
            TIMELINES.map(key => (
              <Option
                active={key === timeline}
                caption={key}
                key={key}
                onPress={() => !fetching && _onTimeline(key)}
              />
            ))
          }
        </View>
      </View>
    );
  }
}

Chart.propTypes = {
  coin: shape(SHAPE.COIN),
};

Chart.defaultProps = {
  coin: undefined,
};

const mapStateToProps = ({ settings }) => ({
  settings,
});

export default connect(mapStateToProps)(Chart);
