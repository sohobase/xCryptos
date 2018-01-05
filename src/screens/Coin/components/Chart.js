import { arrayOf, bool, func, shape } from 'prop-types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { SHAPE, STYLE, THEME } from '../../../config';
import styles from './Chart.style';

const { MOTION: { DURATION }, COLOR } = THEME;
const { HISTORY } = SHAPE;

const Chart = ({
  fetching, dataSource = [], onValue,
}) => {
  const max = Math.max.apply(null, dataSource.map(({ value }) => value));
  const min = Math.min.apply(null, dataSource.map(({ value }) => value));
  const diff = max - min;

  return (
    <Motion
      animation={fetching ? 'slideOutDown' : 'slideInUp'}
      delay={fetching ? 0 : DURATION}
      duration={DURATION / 3}
    >
      <View style={[STYLE.ROW, styles.container]}>
        {
          dataSource.map(({ value }, index) => {
            let color = COLOR.CHART;
            if (value === min) color = COLOR.LOW;
            if (value === max) color = COLOR.HIGH;

            return (
              <TouchableOpacity
                key={index} // eslint-disable-line
                onPressIn={() => onValue(value)}
                onPressOut={() => onValue()}
                style={styles.bar}
              >
                <View
                  style={[styles.value, { height: `${((value - min) * 100) / diff}%`, backgroundColor: color }]}
                />
              </TouchableOpacity>
            );
          })
        }
      </View>
    </Motion>
  );
};

Chart.propTypes = {
  fetching: bool,
  dataSource: arrayOf(shape(HISTORY)),
  onValue: func,
};

Chart.defaultProps = {
  fetching: false,
  dataSource: [],
  onValue() {},
};

export default Chart;
