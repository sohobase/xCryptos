import { array, number, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { C, SHAPE, STYLE } from '../config';
import { formatCurrency } from '../modules';
import styles from './Amount.style';

const { CURRENCY: { USD }, SYMBOL } = C;

const Amount = ({
  settings: { currency }, style, symbol, value,
}) => (
  <View style={STYLE.ROW}>
    { symbol && value > 0 && <Text style={style}>+</Text> }
    { !symbol && currency === USD && <Text style={[style, styles.symbol]}>{SYMBOL.USD}</Text> }
    <Text style={style}>{symbol !== '%' ? formatCurrency(value) : value}</Text>
    { (symbol || currency !== USD) && <Text style={[style, styles.symbol]}>{symbol || SYMBOL[currency]}</Text> }
  </View>
);

Amount.propTypes = {
  settings: shape(SHAPE.SETTINGS),
  style: oneOfType([array, number]),
  symbol: string,
  value: number,
};

Amount.defaultProps = {
  settings: {},
  style: [],
  symbol: undefined,
  value: 0,
};

const mapStateToProps = ({ settings }) => ({
  settings,
});

export default connect(mapStateToProps)(Amount);
