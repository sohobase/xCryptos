import { arrayOf, shape } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SHAPE, STYLE } from '../../../config';
import { Logo } from '../../../components';
import { formatCurrency } from '../../../modules';
import styles from './Hodl.style';

const { FAVORITE } = SHAPE;

const Hodl = ({ favorites }) => {
  let total = 0;
  favorites.forEach(({ hodl, usd }) => total += hodl ? (parseFloat(hodl, 10) * usd) : 0);

  return (
    <View style={[STYLE.ROW, styles.container]}>
      <Logo style={styles.logo} />
      <Text style={styles.amount}>{`$${formatCurrency(total)}`}</Text>
    </View>
  );
};

Hodl.propTypes = {
  favorites: arrayOf(shape(FAVORITE)),
};

Hodl.defaultProps = {
  favorites: [],
};

const mapStateToProps = ({ favorites }) => ({
  favorites,
});

export default connect(mapStateToProps)(Hodl);
