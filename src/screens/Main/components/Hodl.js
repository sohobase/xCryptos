import { arrayOf, shape } from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { ASSET, SHAPE, STYLE } from '../../../config';
import { Amount } from '../../../components';
import styles from './Hodl.style';

const { FAVORITE } = SHAPE;

const Hodl = ({ favorites }) => {
  let total = 0;
  favorites.forEach(({ hodl = 0, price = 0 }) => total += hodl ? (parseFloat(hodl, 10) * price) : 0); // eslint-disable-line

  return (
    <View style={[STYLE.ROW, styles.container]}>
      <Image style={styles.logo} source={ASSET.logo} />
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
