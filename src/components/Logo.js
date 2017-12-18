import { number } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { ASSET } from '../config';
import styles from './Logo.style';

const Logo = ({ style }) => <Image style={[styles.container, style]} source={ASSET.logo} />;

Logo.propTypes = {
  style: number,
};

Logo.defaultProps = {
  style: undefined,
};

export default Logo;
