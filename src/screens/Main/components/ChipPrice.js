import { number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { STYLE } from '../../../config';
import { Amount } from '../../../components';
import styles from './ChipPrice.style';

const ChipPrice = ({
  context, price, value,
}) => (
  <View style={[STYLE.CHIP, styles[context]]}>
    { value > 0 &&
      <View style={STYLE.ROW}>
        <View style={styles.margin}>
          <Amount style={styles.value} value={value} />
        </View>
        { price &&
          <Amount
            style={styles.label}
            value={parseInt(((value * 100) / price) - 100, 10)}
            symbol="%"
          /> }
      </View> }
  </View>
);

ChipPrice.propTypes = {
  context: string,
  price: number,
  value: number,
};

ChipPrice.defaultProps = {
  context: undefined,
  price: undefined,
  value: 0,
};

export default ChipPrice;
