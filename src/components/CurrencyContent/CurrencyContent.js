import { arrayOf, bool, func, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { C, STYLE } from '../../config';
import Chart from '../Chart';
import { ChipPrice, Price, TimelineOption } from './components';
import styles from './CurrencyContent.style';

const CurrencyContent = (props) => {
  const {
    currency: { symbol, usd },
    history,
    onChange,
    refreshing,
    timeline,
  } = props;

  let high = 0;
  let low = 0;
  if (history.length > 0) {
    high = Math.max.apply(null, history.map(({ value }) => value));
    low = Math.min.apply(null, history.map(({ value }) => value));
  }

  return (
    <View style={[STYLE.LAYOUT_MAIN, styles.container]}>
      <View style={styles.prices}>
        { !refreshing && <ChipPrice caption="high" value={high} /> }
        <Price symbol={symbol} value={parseFloat(usd)} />
        { !refreshing && <ChipPrice caption="low" value={low} /> }
      </View>
      <View style={STYLE.ROW}>
        {
          C.TIMELINES.map((key) => {
            return (
              <TimelineOption
                key={key}
                caption={key}
                current={timeline}
                refreshing={refreshing}
                onPress={() => !refreshing && onChange(key)}
              />
            );
          })
        }
      </View>
      <Chart animate dataSource={history} style={styles.chart} />
    </View>
  );
};

CurrencyContent.propTypes = {
  currency: C.SHAPE.CURRENCY,
  history: arrayOf(C.SHAPE.HISTORY),
  onChange: func,
  refreshing: bool,
  timeline: string,
};

CurrencyContent.defaultProps = {
  currency: {},
  history: [],
  onChange: undefined,
  refreshing: false,
  timeline: undefined,
};

export default CurrencyContent;
