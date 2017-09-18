import { bool, func } from 'prop-types';
import { Switch, Text, View } from 'react-native';
import React from 'react';
import { C, STYLE } from '../config';
import styles from './CurrencyListItem.style';

const CurrencyListItem = (props) => {
  const { currency, favorite, onChange } = props;
  const { name, symbol } = currency;

  return (
    <View style={[STYLE.ROW, STYLE.LIST_ITEM]}>
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
  );
};

CurrencyListItem.propTypes = {
  currency: C.SHAPE.CURRENCY,
  favorite: bool,
  onChange: func,
};

CurrencyListItem.defaultProps = {
  currency: {},
  favorite: false,
  onChange: undefined,
};

export default CurrencyListItem;
