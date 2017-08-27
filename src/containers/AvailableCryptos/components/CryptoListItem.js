import { shape, string, number } from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  currency: {
    flex: 1,
  },
  name: {
    // fontWeight: 'bold',
  },
  symbol: {
    opacity: 0.5,
  },
  value: {
    flex: 0,
  },
});

const CryptoListItem = ({ currency }) => {
  const { name, rank, symbol, usd } = currency;

  return (
    <TouchableHighlight key={rank}>
      <View style={styles.container}>
        <View style={styles.currency}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
        </View>
        <Text style={styles.value}>{`$${usd}`}</Text>
      </View>
    </TouchableHighlight>
  );
};

CryptoListItem.propTypes = {
  currency: shape({
    name: string,
    rank: number,
    symbol: string,
    usd: number,
  }),
};

CryptoListItem.defaultProps = {
  currency: {},
};

export default CryptoListItem;
