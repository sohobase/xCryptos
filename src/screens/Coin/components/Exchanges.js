import { arrayOf, shape } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { Amount } from '../../../components';
import { SHAPE } from '../../../config';
import styles from './Exchanges.style';

const Exchanges = ({ dataSource = [] }) => (
  <View style={styles.container}>
    { dataSource.map(({ PRICE, MARKET }) => (
      <View key={`${MARKET}${PRICE}`} style={styles.item}>
        <Amount value={parseFloat(PRICE)} />
        <Text style={styles.market}>{MARKET}</Text>
      </View>)) }
  </View>
);

Exchanges.propTypes = {
  dataSource: arrayOf(shape(SHAPE.EXCHANGE)),
};

Exchanges.defaultProps = {
  dataSource: [],
};

export default Exchanges;
