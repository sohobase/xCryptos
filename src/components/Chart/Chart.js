import { arrayOf, number } from 'prop-types';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { C, STYLE } from '../../config';
import { Bar } from './components';
import styles from './Chart.style';

const Chart = ({ dataSource = [], style }) => {
  const max = Math.max.apply(null, dataSource.map(({ value }) => value));
  const withData = dataSource.length > 0;

  return (
    <View style={[STYLE.ROW, (withData ? styles.container : styles.loading), style]}>
      { withData
        ? dataSource.map(({ timestamp, value }) => <Bar key={timestamp} value={(value * 100) / max} />)
        : <ActivityIndicator size="large" />
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
