import { shape } from 'prop-types';
import { Linking, Text, View } from 'react-native';
import React from 'react';
import { C, SHAPE, STYLE } from '../../../config';
import { Button } from '../../../components';
import { formatCurrency } from '../../../modules';
import styles from './ExchangeListItem.style';

const { CURRENCY, EXCHANGE } = SHAPE;

const ExchangeListItem = ({
  currency, exchange: { MARKET, PRICE = 0 },
}) => {
  return (
    <View style={[STYLE.ROW, styles.container]}>
      <View style={[STYLE.CENTERED, styles.priceBox]}>
        <Text style={styles.price}>${formatCurrency(PRICE)}</Text>
      </View>
      <Text style={styles.market}>{MARKET}</Text>
      {
        (MARKET.toLowerCase() === 'coinbase') &&
          <Button
            caption={`Get ${currency.symbol} in Coinbase`}
            captionStyle={styles.buttonCaption}
            onPress={() => Linking.openURL(C.AFILIATES.COINBASE)}
            style={styles.button}
          />
      }
    </View>
  );
};

ExchangeListItem.propTypes = {
  currency: shape(CURRENCY),
  exchange: shape(EXCHANGE),
};

ExchangeListItem.defaultProps = {
  currency: {},
  exchange: {},
};

export default ExchangeListItem;
