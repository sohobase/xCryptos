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

const Option = ({
  active, caption, onPress, // eslint-disable-line
}) => (
  <Touchable onPress={onPress}>
    <View style={[STYLE.CHIP, STYLE.ROW, styles.option, (active && styles.active)]}>
      <Text style={[styles.caption, (active && styles.captionActive)]}>{caption}</Text>
    </View>
  </Touchable>
);

const Chart = ({
  coin: { price }, fetching, dataSource = [], onTimeline, timeline,
}) => {
  const max = fetching ? 0 : Math.max.apply(null, dataSource.map(({ value }) => value));
  const min = fetching ? 0 : Math.min.apply(null, dataSource.map(({ value }) => value));
  const diff = max - min;

  return (
    <View style={styles.container}>
      <View style={[STYLE.ROW, styles.prices]}>
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
            const key = `${timeline}-${new Date()}-${index}`;
            const height = fetching ? 0 : ((value - min) * 100) / diff;

            return (
              <TouchableOpacity key={key} style={styles.bar}>
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
              onPress={() => !fetching && onTimeline(key)} />
          ))
        }
      </View>
    </View>
  );
};

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
