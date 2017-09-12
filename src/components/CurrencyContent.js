import { arrayOf } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { C, STYLE } from '../config';
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
    snapshot: { price },
    history,
  } = props;

  let max = 0;
  let min = 0;
  if (history.length > 0) {
    max = Math.max.apply(null, history.map(({ value }) => value)) || 0;
    min = Math.min.apply(null, history.map(({ value }) => value)) || 0;
  }

  return (
    <View style={styles.container}>
      { renderHistoryPrice(min, 'low') }
      <View style={styles.current}>
        <Text style={[styles.label, styles.currentSymbol]}>$</Text>
        <Text style={styles.currentPrice}>{price || usd} </Text>
        <View style={[STYLE.CHIP, styles.chipSymbol]}>
          <Text style={[styles.small, styles.label, styles.bold]}>{symbol}</Text>
        </View>
      </View>
      { renderHistoryPrice(max, 'high') }
    </View>
  );
};

CurrencyContent.propTypes = {
  currency: C.SHAPE.CURRENCY,
  history: arrayOf(C.SHAPE.HISTORY),
  snapshot: C.SHAPE.SNAPSHOT,
};

CurrencyContent.defaultProps = {
  currency: {},
  history: [],
  snapshot: {},
};

export default CurrencyContent;
