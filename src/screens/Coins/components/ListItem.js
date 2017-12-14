import { bool, func, shape } from 'prop-types';
import React from 'react';
import { Switch, Text, View } from 'react-native';
import { SHAPE, STYLE } from '../../../config';
import styles from './ListItem.style';

const { CURRENCY } = SHAPE;

const CurrencyListItem = (props) => {
  const { currency, favorite, onChange } = props;
  const { name, symbol } = currency;

  return (
    <View style={[STYLE.ROW, STYLE.LIST_ITEM]}>
      <View style={styles.currency}>
        <Text style={styles.name}>{name}</Text>
        { 1 === 2 && <Text style={styles.symbol}>{symbol.toUpperCase()}</Text> }
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
  currency: shape(CURRENCY),
  favorite: bool,
  onChange: func,
};

CurrencyListItem.defaultProps = {
  currency: {},
  favorite: false,
  onChange: undefined,
};

export default CurrencyListItem;
