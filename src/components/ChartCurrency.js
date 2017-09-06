import { arrayOf, func, number, string } from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { C, STYLE } from '../config';
import Chart from './Chart';
import styles from './ChartCurrency.style';

const ChartCurrency = (props) => {
  const { dataSource = [], onChange, style, timeline } = props;
  let max = 0;
  let min = 0;
  if (dataSource.length > 0) {
    max = Math.max.apply(null, dataSource.map(({ value }) => value));
    min = Math.min.apply(null, dataSource.map(({ value }) => value));
  }

  return (
    <View style={style}>
      <View style={STYLE.ROW}>
        {
          C.TIMELINES.map((key, index) => {
            const styleTab = [styles.tab];
            if (index === 1) styleTab.push(styles.tabMargin);
            if (key === timeline) styleTab.push(styles.tabActive);

            return (
              <TouchableOpacity key={key} style={styles.navButton} onPress={() => onChange(key)}>
                <Text style={styleTab}>{key}</Text>
              </TouchableOpacity>
            );
          })
        }
      </View>

      <Chart style={styles.chart} dataSource={dataSource} />

      <View style={STYLE.ROW}>
        <View style={styles.left}>
          <Text style={styles.label}>low</Text>
          <Text style={[STYLE.FONT_STRONG, styles.highlight]}>${min}</Text>
        </View>
        <View>
          <Text style={[styles.label, styles.right]}>high</Text>
          <Text style={[STYLE.FONT_STRONG, styles.highlight, styles.right]}>${max}</Text>
        </View>
      </View>
    </View>
  );
};

ChartCurrency.propTypes = {
  dataSource: arrayOf(C.SHAPE.HISTORY),
  onChange: func,
  style: number,
  timeline: string,
};

ChartCurrency.defaultProps = {
  dataSource: [],
  onChange: undefined,
  style: undefined,
  timeline: C.TIMELINES[0],
};

export default ChartCurrency;
