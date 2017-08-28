import { func, shape, string, number } from 'prop-types';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React from 'react';
import { THEME } from '../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.PRIMARY,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  text: {
    color: 'white',
  },
  currency: {
    flex: 1,
  },
  name: {
    opacity: 0.75,
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  values: {
    flex: 0,
    marginRight: 12,
    marginLeft: 12,
  },
  value: {
    fontSize: 20,
    textAlign: 'right',
  },
  valueUSD: {
    opacity: 0.75,
  },
});

const FavoriteItem = (props) => {
  const { currency, onPress, value } = props;
  const { name, symbol = '', usd } = currency;

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.currency}>
          <Text style={[styles.symbol, styles.text]}>{symbol.toUpperCase()}</Text>
          <Text style={[styles.name, styles.text]}>{name}</Text>
        </View>
        <View>
          <Text style={[styles.value, styles.text]}>{`${value}`}</Text>
          <Text style={[styles.valueUSD, styles.text]}>{`$${usd}`}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

FavoriteItem.propTypes = {
  currency: shape({
    name: string,
    rank: number,
    symbol: string,
    usd: number,
  }),
  onPress: func,
  value: number,
};

FavoriteItem.defaultProps = {
  currency: {},
  onPress: undefined,
  value: 0,
};

export default FavoriteItem;
