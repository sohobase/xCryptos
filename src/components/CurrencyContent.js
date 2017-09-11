import { arrayOf } from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { C, STYLE } from '../config';
import styles from './CurrencyContent.style';

const CurrencyContent = (props) => {
  const {
    currency: { image, name, symbol, usd },
    snapshot: { price },
    history,
  } = props;

  let max = 0;
  let min = 0;
  if (history.length > 0) {
    max = Math.max.apply(null, history.map(({ value }) => value));
    min = Math.min.apply(null, history.map(({ value }) => value));
  }

  return (
    <View style={styles.container}>
      <View style={[STYLE.ROW, styles.chip, styles.low]}>
        <Text style={[styles.small, styles.label]}>$</Text>
        <Text style={[styles.small, styles.historyPrice]}>{min}</Text>
        <Text style={[styles.small, styles.label]}> low</Text>
      </View>
      <View style={styles.current}>
        <Text style={[styles.label, styles.currentSymbol]}>$</Text>
        <Text style={styles.currentPrice}>{price || usd} </Text>
        { image && <Image style={styles.currentIcon} source={{ uri: image }} /> }
      </View>
      <View style={[STYLE.ROW, styles.chip, styles.high]}>
        <Text style={[styles.small, styles.label]}>$</Text>
        <Text style={[styles.small, styles.historyPrice]}>{max}</Text>
        <Text style={[styles.small, styles.label]}> high</Text>
      </View>
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
