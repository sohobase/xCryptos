import { bool, shape, string, number } from 'prop-types';
import { StyleSheet, Switch, Text, TouchableHighlight, View } from 'react-native';
import React from 'react';
import { ServiceCryptos } from '../../../services';

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
    marginRight: 12,
    marginLeft: 12,
  },
});

const onPress = (currency, favorite) => {
  console.log('_onPress', currency, favorite);
  // @TODO: Should add to favorite list
};

const CryptoListItem = ({ currency, favorite }) => {
  const { name, symbol, usd } = currency;

  return (
    <TouchableHighlight onPress={onPress.bind(null, currency)}>
      <View style={styles.container}>
        <View style={styles.currency}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
        </View>
        <Text style={styles.value}>{`$${usd}`}</Text>
        <Switch
          style={styles.switch}
          onValueChange={onPress.bind(null, currency, favorite)}
          _thumbTintColor='deeppink'
          value={favorite}
        />
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
  favorite: bool,
};

CryptoListItem.defaultProps = {
  currency: {},
  favorite: false,
};

export default CryptoListItem;
