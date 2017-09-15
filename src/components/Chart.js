import { arrayOf, number } from 'prop-types';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { C, STYLE, THEME } from '../config';
import Bar from './Bar';
import styles from './Chart.style';

const Chart = ({ dataSource = [], style }) => {
  const withData = dataSource.length > 0;
  const max = Math.max.apply(null, dataSource.map(({ value }) => value));
  const min = Math.min.apply(null, dataSource.map(({ value }) => value));
  const diff = max - min;

  return (
    <View style={[style, STYLE.ROW, (withData ? styles.container : styles.loading)]}>
      { !withData && <ActivityIndicator color={THEME.WHITE} size="large" /> }
      {
        withData && dataSource.map(({ timestamp, value }) => {
          let color = 'rgba(255, 255, 255, 0.35)';
          if (value === min) color = THEME.COLOR_LOW;
          if (value === max) color = THEME.COLOR_HIGH;

          return (
            <Bar key={timestamp} color={color} value={((value - min) * 100) / diff} />
          );
        })
      }
    </View>
  );
};

Chart.propTypes = {
  dataSource: arrayOf(C.SHAPE.HISTORY),
  style: number,
};

Chart.defaultProps = {
  dataSource: [],
  style: undefined,
};

export default Chart;
