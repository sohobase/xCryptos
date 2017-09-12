import { shape, string } from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { STYLE } from '../config';
import styles from './ExchangerListItem.style';

const ExchangerListItem = ({ exchanger: { MARKET, PRICE = 0 } }) => {
  return (
    <View style={[STYLE.ROW, styles.container]}>
      <Text style={styles.price}>${parseFloat(PRICE).toFixed(2)}</Text>
      <Text style={styles.market}>{MARKET}</Text>
      {
        (MARKET.toLowerCase() === 'coinbase') &&
          <TouchableOpacity style={[STYLE.CHIP, styles.chip]}>
            <Text style={styles.chipCaption}>PURCHASE</Text>
          </TouchableOpacity>
      }
    </View>
  );
};

ExchangerListItem.propTypes = {
  exchanger: shape({
    MARKET: string,
    PRICE: string,
  }),
};

ExchangerListItem.defaultProps = {
  exchanger: {},
};

export default ExchangerListItem;
