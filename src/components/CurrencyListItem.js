import { bool, func } from 'prop-types';
import { Switch, Text, View } from 'react-native';
import React from 'react';
import { C } from '../config';
import Touchable from './Touchable';
import styles from './CurrencyListItem.style';

const CurrencyListItem = (props) => {
  const { currency, favorite, onChange, onPress } = props;
  const { name, symbol } = currency;

  return (
    <Touchable onPress={onPress}>
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
    </Touchable>
  );
};

CurrencyListItem.propTypes = {
  currency: C.SHAPE.CURRENCY,
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
