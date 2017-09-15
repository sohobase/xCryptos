import { arrayOf, bool, func, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { C, STYLE } from '../config';
import Chart from './Chart';
import Touchable from './Touchable';
import styles from './CurrencyContent.style';

const renderHistoryPrice = (value, caption) => {
  return (
    <View style={[STYLE.ROW, STYLE.CHIP, styles[caption]]}>
      <Text style={[styles.small, styles.label]}>$</Text>
      <Text style={[styles.small, styles.historyPrice]}>{value}</Text>
      <Text style={[styles.small, styles.label]}>{` ${caption}`}</Text>
    </View>
  );
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

  let max = 0;
  let min = 0;
  if (history.length > 0) {
    max = Math.max.apply(null, history.map(({ value }) => value)) || 0;
    min = Math.min.apply(null, history.map(({ value }) => value)) || 0;
  }

  return (
    <View style={[STYLE.LAYOUT_MAIN, styles.container]}>
      <View style={styles.prices}>
        { renderHistoryPrice(max, 'high') }
        <View style={styles.current}>
          <Text style={[styles.label, styles.currentSymbol]}>$</Text>
          <Text style={styles.currentPrice}>{price || usd} </Text>
          <View style={[STYLE.CHIP, styles.chipSymbol]}>
            <Text style={[styles.small, styles.label, styles.bold]}>{symbol}</Text>
          </View>
        </View>
        { renderHistoryPrice(min, 'low') }
      </View>
      <View>
        <View style={STYLE.ROW}>
          {
            C.TIMELINES.map((key) => {
              const styleOption = [styles.small, styles.label, styles.optionCaption];
              const styleBullet = [STYLE.BULLET, styles.bullet];
              if (key === timeline) {
                styleOption.push(styles.optionCaptionActive);
                styleBullet.push(styles.bulletActive);
              } else if (refreshing) {
                styleOption.push(styles.optionDisabled);
                styleBullet.push(styles.optionDisabled);
              }

              return (
                <Touchable key={key} onPress={() => !refreshing && onChange(key)}>
                  <View style={[STYLE.ROW, styles.option]}>
                    <View style={styleBullet} />
                    <Text style={styleOption}>{key}</Text>
                  </View>
                </Touchable>
              );
            })
          }
        </View>
      </View>
      <Chart style={styles.chart} dataSource={history} />
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
