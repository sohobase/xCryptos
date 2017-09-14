import { Linking, Text, View } from 'react-native';
import React from 'react';
import { C, STYLE, THEME } from '../config';
import { Button } from '../components';
import styles from './ExchangeListItem.style';

const ExchangeListItem = ({ currency, exchange: { MARKET, PRICE = 0 } }) => {
  return (
    <View style={[STYLE.ROW, styles.container]}>
      <View style={[STYLE.CENTERED, styles.priceBox]}>
        <Text style={styles.price}>${parseFloat(PRICE).toFixed(2)}</Text>
      </View>
      <Text style={styles.market}>{MARKET}</Text>
      {
        (MARKET.toLowerCase() === 'coinbase') &&
          <Button
            caption={`Get ${currency.symbol} in Coinbase`}
            onPress={() => Linking.openURL(C.AFILIATES.COINBASE)}
            style={styles.button}
            tintColor={THEME.COLOR_COINBASE}
          />
      }
    </View>
  );
};

ExchangeListItem.propTypes = {
  currency: C.SHAPE.CURRENCY,
  exchange: C.SHAPE.EXCHANGE,
};

ExchangeListItem.defaultProps = {
  currency: {},
  exchange: {},
};

export default ExchangeListItem;
