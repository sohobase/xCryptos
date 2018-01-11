import { arrayOf, bool, func, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { Touchable } from '../../../components';
import { C, SHAPE, STYLE, THEME } from '../../../config';
import styles from './Chart.style';
import ChipPrice from './ChipPrice';

const { TIMELINES } = C;
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
      price: undefined,
      timestamp: (new Date()).getTime(),
    };
    this._onValue = this._onValue.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ timestamp: (new Date()).getTime() });
  }

  _onValue(price) {
    this.setState({ price });
  }

  render() {
    const {
      _onValue,
      props: {
        coin, fetching, dataSource = [], onTimeline, timeline,
      },
      state: { price = coin.price, timestamp },
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
          <View style={[STYLE.CENTERED, styles.space]}>
            <ChipPrice value={fetching ? 0 : price} />
          </View>
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
                onPress={() => !fetching && onTimeline(key)}
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
  fetching: bool,
  dataSource: arrayOf(shape(SHAPE.HISTORY)),
  onTimeline: func,
  timeline: string,
};

Chart.defaultProps = {
  coin: undefined,
  fetching: false,
  dataSource: [],
  onTimeline() {},
  timeline: undefined,
};

export default Chart;
