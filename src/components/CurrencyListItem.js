import { bool, func, shape, string, number } from 'prop-types';
import { Switch, Text, TouchableHighlight, View } from 'react-native';
import React from 'react';
import styles from './CurrencyListItem.style';

const CurrencyListItem = (props) => {
  const { currency, favorite, onChange, onPress } = props;
  const { name, symbol } = currency;

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.currency}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
        </View>
        <Switch
          style={styles.switch}
          onValueChange={() => onChange({ currency, favorite })}
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
