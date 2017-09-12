import { arrayOf, func, number, string } from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { C, STYLE } from '../config';
import Chart from './Chart';
import styles from './ChartCurrency.style';

const ChartCurrency = (props) => {
  const { dataSource = [], onChange, style, timeline } = props;

  return (
    <View style={style}>
      <View style={[STYLE.ROW, STYLE.CENTERED, styles.filters]}>
        {
          C.TIMELINES.map((key) => {
            const styleOption = [styles.small, styles.label, styles.optionCaption];
            const styleBullet = [STYLE.BULLET, styles.bullet];
            if (key === timeline) {
              styleOption.push(styles.optionCaptionActive);
              styleBullet.push(styles.bulletActive);
            }

            return (
              <TouchableOpacity key={key} style={[STYLE.ROW, styles.option]} onPress={() => onChange(key)}>
                <View style={styleBullet} />
                <Text style={styleOption}>{key}</Text>
              </TouchableOpacity>
            );
          })
        }
      </View>

      <Chart style={styles.chart} dataSource={dataSource} />
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
