import { bool, func, string } from 'prop-types';
import React from 'react';
import { Switch, Text, View } from 'react-native';
import { STYLE } from '../../../config';
import styles from '../Settings.style';

const FieldsetSwitch = ({
  label,
  caption,
  onChange,
  value,
}) => (
  <View style={STYLE.LIST_ITEM}>
    <View>
      { label && <Text style={styles.label}>{label}</Text> }
      <View style={STYLE.ROW}>
        <Text style={[styles.value, styles.caption]}>{caption}</Text>
        <Switch onValueChange={onChange} value={value} />
      </View>
    </View>
  </View>
);

FieldsetSwitch.propTypes = {
  caption: string,
  label: string,
  onChange: func,
  value: bool,
};

FieldsetSwitch.defaultProps = {
  caption: undefined,
  label: undefined,
  onChange() {},
  value: false,
};

export default FieldsetSwitch;
