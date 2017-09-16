import { func } from 'prop-types';
import { Text, View } from 'react-native';
import React from 'react';
import { C, STYLE } from '../config';
import Touchable from './Touchable';
import styles from './AlertListItem.style';

const AlertListItem = (props) => {
  const { alert, onPress } = props;
  const { low, high } = alert;

  return (
    <Touchable onPress={onPress}>
      <View style={[STYLE.ROW, STYLE.LIST_ITEM]}>
        <View style={styles.left}>
          <View style={STYLE.ROW}>
            <Text style={styles.symbol}>$</Text>
            <Text style={styles.price}>{low.toFixed(2)}</Text>
          </View>
          <Text style={styles.label}>low</Text>
        </View>
        <View style={styles.right}>
          <View style={STYLE.ROW}>
            <Text style={styles.symbol}>$</Text>
            <Text style={styles.price}>{high.toFixed(2)}</Text>
          </View>
          <Text style={styles.label}>high</Text>
        </View>
      </View>
    </Touchable>
  );
};

AlertListItem.propTypes = {
  alert: C.SHAPE.ALERT,
  onPress: func,
};

AlertListItem.defaultProps = {
  alert: {},
  onPress: undefined,
};

export default AlertListItem;
