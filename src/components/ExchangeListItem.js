import { shape, string } from 'prop-types';
import { Linking, Text, View } from 'react-native';
import React from 'react';
import { C, STYLE } from '../config';
import { Button } from '../components';
import styles from './ExchangeListItem.style';

const ExchangeListItem = ({ exchanger: { MARKET, PRICE = 0 } }) => {
  return (
    <View style={[STYLE.ROW, styles.container]}>
      <View style={[STYLE.CENTERED, styles.priceBox]}>
        <Text style={styles.price}>${parseFloat(PRICE).toFixed(2)}</Text>
      </View>
      <Text style={styles.market}>{MARKET}</Text>
      {
        (MARKET.toLowerCase() === 'coinbase') &&
          <Button
            caption="Purchase"
            onPress={() => Linking.openURL(C.AFILIATES.COINBASE)}
            style={styles.button}
          />
      }
    </View>
  );
};

ExchangeListItem.propTypes = {
  exchanger: shape({
    MARKET: string,
    PRICE: string,
  }),
};

ExchangeListItem.defaultProps = {
  exchanger: {},
};

export default ExchangeListItem;
