import { bool, func, shape } from 'prop-types';
import React from 'react';
import { Switch, Text, View } from 'react-native';
import { SHAPE, STYLE } from '../../../config';
import styles from './ListItem.style';

const { COIN } = SHAPE;

const CoinListItem = ({ coin = {}, favorite, onChange }) => (
  <View style={[STYLE.ROW, STYLE.LIST_ITEM]}>
    <Text style={styles.name}>{coin.name}</Text>
    <Switch
      style={styles.switcher}
      onValueChange={() => onChange({ coin, favorite })}
      value={favorite}
    />
  </View>
);

CoinListItem.propTypes = {
  coin: shape(COIN),
  favorite: bool,
  onChange: func,
};

CoinListItem.defaultProps = {
  coin: {},
  favorite: false,
  onChange: undefined,
};

export default CoinListItem;
