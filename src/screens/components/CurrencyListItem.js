import { bool, func, shape, string, number } from 'prop-types';
import { StyleSheet, Switch, Text, TouchableHighlight, View } from 'react-native';
import React from 'react';
import { THEME } from '../../config';

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

const CurrencyListItem = (props) => {
  const { currency, favorite, onChange, onPress } = props;
  const { name, symbol, usd } = currency;

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.currency}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
        </View>
        <Text style={styles.value}>{`$${usd}`}</Text>
        <Switch
          style={styles.switch}
          onValueChange={onChange.bind(null, { currency, favorite })}
          thumbTintColor={THEME.PRIMARY}
          value={favorite}
        />
      </View>
    </TouchableHighlight>
  );
};

CurrencyListItem.propTypes = {
  currency: shape({
    name: string,
    rank: number,
    symbol: string,
    usd: number,
  }),
  favorite: bool,
  onChange: func,
  onPress: func,
};

CurrencyListItem.defaultProps = {
  currency: {},
  favorite: false,
  onChange: undefined,
  onPress: undefined,
};

export default CurrencyListItem;
