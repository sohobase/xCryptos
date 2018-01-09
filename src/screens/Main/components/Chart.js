import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { Touchable } from '../../../components';
import { C, SHAPE, STYLE, THEME } from '../../../config';
import styles from './Chart.style';
import ChipPrice from './ChipPrice';

const { TIMELINES } = C;
const { MOTION, COLOR } = THEME;
const { HISTORY } = SHAPE;

const Option = ({
  active, caption, onPress, // eslint-disable-line
}) => (
  <Touchable onPress={onPress}>
    <Motion
      {...MOTION.DEFAULT}
      delay={400}
      style={[STYLE.CHIP, STYLE.ROW, styles.option, (active && styles.active)]}
    >
      <Text style={[styles.caption, (active && styles.captionActive)]}>{caption}</Text>
    </Motion>
  </Touchable>
);

const Chart = ({
  fetching, dataSource = [], onTimeline, price, timeline,
}) => {
  const max = Math.max.apply(null, dataSource.map(({ value }) => value));
  const min = Math.min.apply(null, dataSource.map(({ value }) => value));
  const diff = max - min;

  return (
    <View style={styles.container}>
      <View style={STYLE.ROW}>
        <ChipPrice price={price} icon="down" value={min} />
        <View style={styles.space} />
        <ChipPrice price={price} icon="up" value={max} />
      </View>
      <View style={[STYLE.ROW, styles.bars]}>
        {
          dataSource.map(({ value }, index) => {
            let color = COLOR.CHART;
            if (value === min) color = COLOR.LOW;
            if (value === max) color = COLOR.HIGH;

            return (
              <TouchableOpacity key={`${timeline}-${index}`} style={styles.bar}>
                <Motion
                  {...MOTION.DEFAULT}
                  style={[styles.value, { height: `${((value - min) * 100) / diff}%`, backgroundColor: color }]}
                />
              </TouchableOpacity>
            );
          })
        }
      </View>
      <View style={STYLE.ROW}>
        {
          TIMELINES.map(key => (
            <Option active={key === timeline} caption={key} key={key} onPress={() => !fetching && onTimeline(key)} />
          ))
        }
      </View>
    </View>
  );
};

Chart.propTypes = {
  fetching: bool,
  dataSource: arrayOf(shape(HISTORY)),
  onTimeline: func,
  price: number,
  timeline: string,
};

Chart.defaultProps = {
  fetching: false,
  dataSource: [],
  onTimeline() {},
  price: undefined,
  timeline: undefined,
};

export default Chart;
