import { arrayOf, bool, number, shape } from 'prop-types';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SHAPE, STYLE, THEME } from '../../../config';
import ChartBar from './ChartBar';
import styles from './Chart.style';

const { COLOR } = THEME;
const { HISTORY } = SHAPE;

const Chart = ({ animate, dataSource = [], style }) => {
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
              animate={animate}
              key={timestamp}
              color={color}
              delay={index * 5}
              value={((value - min) * 100) / diff}
            />
          );
        })
      }
    </View>
  );
};

Chart.propTypes = {
  animate: bool,
  dataSource: arrayOf(shape(HISTORY)),
  style: number,
};

Chart.defaultProps = {
  animate: false,
  dataSource: [],
  style: undefined,
};

export default Chart;
