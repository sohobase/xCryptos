import { arrayOf, func, number, shape } from 'prop-types';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SHAPE, STYLE, THEME } from '../../../config';
import ChartBar from './ChartBar';
import styles from './Chart.style';

const { COLOR } = THEME;
const { HISTORY } = SHAPE;

const Chart = ({ dataSource = [], onValue, style }) => {
  const withData = dataSource.length > 0;
  const max = Math.max.apply(null, dataSource.map(({ value }) => value));
  const min = Math.min.apply(null, dataSource.map(({ value }) => value));
  const diff = max - min;

  return (
    <View style={[style, STYLE.ROW, (withData ? styles.container : styles.loading)]}>
      { !withData && <ActivityIndicator color={THEME.WHITE} size="large" /> }
      {
        withData && dataSource.map(({ timestamp, value }, index) => {
          let color = COLOR.CHART;
          if (value === min) color = COLOR.LOW;
          if (value === max) color = COLOR.HIGH;

          return (
            <ChartBar
              color={color}
              delay={index * 5}
              key={timestamp}
              onPressIn={() => onValue(value)}
              onPressOut={() => onValue()}
              value={((value - min) * 100) / diff}
            />
          );
        })
      }
    </View>
  );
};

Chart.propTypes = {
  dataSource: arrayOf(shape(HISTORY)),
  onValue: func,
  style: number,
};

Chart.defaultProps = {
  dataSource: [],
  onValue() {},
  style: undefined,
};

export default Chart;
