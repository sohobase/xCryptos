import { func, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { STYLE } from '../../../config';
import { Touchable } from '../../../components';
import styles from './Option.style';

const Option = ({
  caption, onPress, hint,
}) => (
  <Touchable onPress={onPress}>
    <View style={[STYLE.LIST_ITEM, styles.option]}>
      <Text style={styles.caption}>{caption}</Text>
      { hint && <Text style={styles.hint}>{hint}</Text> }
    </View>
  </Touchable>
);

Option.propTypes = {
  caption: string,
  hint: string,
  onPress: func,
};

Option.defaultProps = {
  caption: undefined,
  hint: undefined,
  onPress: undefined,
};

export default Option;
