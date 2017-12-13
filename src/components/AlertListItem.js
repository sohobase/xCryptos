import { func, shape } from 'prop-types';
import { Text, View } from 'react-native';
import React from 'react';
import { SHAPE, STYLE } from '../config';
import { formatCurrency } from '../modules';
import Touchable from './Touchable';
import styles from './AlertListItem.style';

const { ALERT } = SHAPE;

const AlertListItem = (props) => {
  const { alert, onPress } = props;
  const { low, high } = alert;

  return (
    <Touchable onPress={onPress}>
      <View style={[STYLE.ROW, STYLE.LIST_ITEM]}>
        <View style={styles.left}>
          <View style={STYLE.ROW}>
            <Text style={styles.symbol}>$</Text>
            <Text style={styles.price}>{formatCurrency(low)}</Text>
          </View>
          <Text style={styles.label}>low</Text>
        </View>
        <View style={styles.right}>
          <View style={STYLE.ROW}>
            <Text style={styles.symbol}>$</Text>
            <Text style={styles.price}>{formatCurrency(high)}</Text>
          </View>
          <Text style={styles.label}>high</Text>
        </View>
      </View>
    </Touchable>
  );
};

AlertListItem.propTypes = {
  alert: shape(ALERT),
  onPress: func,
};

AlertListItem.defaultProps = {
  alert: {},
  onPress: undefined,
};

export default AlertListItem;
