import { func } from 'prop-types';
import { Text, View } from 'react-native';
import React from 'react';
import { C, STYLE } from '../config';
import Touchable from './Touchable';
import styles from './AlertListItem.style';

const AlertListItem = (props) => {
  const { alert, onPress } = props;
  const { currency, low, high } = alert;

  return (
    <Touchable onPress={() => onPress(alert)}>
      <View style={[STYLE.ROW, styles.container]}>
        <Text style={styles.low}>low {low}</Text>
        <Text style={styles.high}>high {high}</Text>
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
