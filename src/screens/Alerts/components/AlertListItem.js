import { func, shape } from 'prop-types';
import { Text, View } from 'react-native';
import React from 'react';
import { Amount, Touchable } from '../../../components';
import { SHAPE, STYLE } from '../../../config';
import styles from './AlertListItem.style';

const { ALERT } = SHAPE;

const AlertListItem = (props) => {
  const { alert, onPress } = props;
  const { low, high } = alert;

  return (
    <Touchable onPress={onPress}>
      <View style={[STYLE.ROW, STYLE.LIST_ITEM]}>
        <View style={styles.left}>
          <Amount style={styles.price} value={low} />
          <Text style={styles.label}>low</Text>
        </View>
        <View style={styles.right}>
          <Amount style={styles.price} value={high} />
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
