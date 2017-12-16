import { array, number, oneOfType, shape } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { C, SHAPE, STYLE } from '../config';
import { formatCurrency } from '../modules';

const { CURRENCY } = SHAPE;
const { CURRENCY: { USD }, SYMBOL } = C;

const symbolStyle = {
  opacity: 0.85,
  transform: [{ scale: 0.85 }],
};

const Amount = ({ settings: { currency }, style, value }) => (
  <View style={STYLE.ROW}>
    { currency === USD && <Text style={[style, symbolStyle]}>{SYMBOL.USD}</Text> }
    <Text style={style}>{formatCurrency(value)}</Text>
    { currency !== USD && <Text style={[style, symbolStyle]}>{SYMBOL[currency]}</Text> }
  </View>
);

Amount.propTypes = {
  settings: shape(CURRENCY),
  style: oneOfType([array, number]),
  value: number,
};

Amount.defaultProps = {
  settings: {},
  style: [],
  value: 0,
};

const mapStateToProps = ({ settings }) => ({
  settings,
});

export default connect(mapStateToProps)(Amount);
