import { shape } from 'prop-types';
import { Linking, Text, View } from 'react-native';
import React from 'react';
import { C, SHAPE, STYLE } from '../../../config';
import { Amount, Button } from '../../../components';
import styles from './ExchangeListItem.style';

const { COIN, EXCHANGE } = SHAPE;

const ExchangeListItem = ({
  coin: { coin }, exchange: { MARKET, PRICE = 0 },
}) => (
  <View style={[STYLE.ROW, styles.container]}>
    <View style={[STYLE.CENTERED, styles.priceBox]}>
      <Amount style={styles.price} value={parseFloat(PRICE)} />
    </View>
    <Text style={styles.market}>{MARKET}</Text>
    {
      (MARKET.toLowerCase() === 'coinbase') &&
        <Button
          caption={`Get ${coin} in Coinbase`}
          captionStyle={styles.buttonCaption}
          onPress={() => Linking.openURL(C.AFILIATES.COINBASE)}
          style={styles.button}
        />
    }
  </View>
);

ExchangeListItem.propTypes = {
  coin: shape(COIN),
  exchange: shape(EXCHANGE),
};

ExchangeListItem.defaultProps = {
  coin: {},
  exchange: {},
};

export default ExchangeListItem;
