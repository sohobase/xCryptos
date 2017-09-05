import { arrayOf, number } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { STYLE } from '../../config';
import { Bar } from './components';
import styles from './Chart.style';

const Chart = ({ dataSource = [], style }) => {
  const max = Math.max.apply(null, dataSource);

  return (
    <View style={[STYLE.ROW, styles.container, style]}>
      { dataSource.map(value => <Bar value={(value * 100) / max} />) }
    </View>
  );
};

Chart.propTypes = {
  dataSource: arrayOf(number),
  style: number,
};

Chart.defaultProps = {
  dataSource: [1000, 10, 50, 73, 39, 29, 29, 92, 10, 39, 95, 94, 10, 92, 100, 10, 50, 73, 39, 29, 29, 92, 10, 39, 95, 94, 10, 92],
  style: undefined,
};

export default Chart;
