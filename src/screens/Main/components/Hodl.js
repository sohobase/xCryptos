import { arrayOf, shape } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { SHAPE, STYLE } from '../../../config';
import { Amount, Logo } from '../../../components';
import styles from './Hodl.style';

const { FAVORITE } = SHAPE;

const Hodl = ({ favorites }) => {
  let total = 0;
  favorites.forEach(({ hodl = 0, price = 0 }) => total += hodl ? (parseFloat(hodl, 10) * price) : 0); // eslint-disable-line

  return (
    <View style={[STYLE.ROW, styles.container]}>
      <Logo style={styles.logo} />
      <Amount style={styles.amount} value={total} />
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
