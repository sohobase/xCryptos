import { shape, string, number } from 'prop-types';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
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
    marginRight: 12,
    marginLeft: 12,
  },
});

const FavoriteItem = (props) => {
  const { value } = props;
  const { name, symbol = '', usd } = value;

  return (
    <TouchableHighlight>
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

FavoriteItem.propTypes = {
  value: shape({
    name: string,
    rank: number,
    symbol: string,
    usd: number,
  }),
};

FavoriteItem.defaultProps = {
  value: {},
};

export default FavoriteItem;
