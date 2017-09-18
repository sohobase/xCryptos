import { arrayOf, bool, func, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { C, STYLE, THEME } from '../../config';
import Chart from '../Chart';
import { ChipPrice, Prices, TimelineOption } from './components';
import styles from './CurrencyContent.style';

const DEFAULT_ANIMATION = {
  // animation: 'bounceIn',
  duration: THEME.ANIMATION_DURATION,
  easing: THEME.ANIMATION_EASING,
};

const CurrencyContent = (props) => {
  const {
    currency: { symbol, usd },
    history,
    onChange,
    refreshing,
    snapshot: { price },
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
        <ChipPrice caption="high" refreshing={refreshing} value={high} />
        <Prices symbol={symbol} value={parseFloat(price || usd)} />
        <ChipPrice caption="low" refreshing={refreshing} value={low} />
      </View>
      <View style={STYLE.ROW}>
        {
          C.TIMELINES.map((key, index) => {
            return (
              <TimelineOption
                key={key}
                caption={key}
                current={timeline}
                delay={index + 1}
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
  snapshot: C.SHAPE.SNAPSHOT,
  timeline: string,
};

CurrencyContent.defaultProps = {
  currency: {},
  history: [],
  onChange: undefined,
  refreshing: false,
  snapshot: {},
  timeline: undefined,
};

export default CurrencyContent;
