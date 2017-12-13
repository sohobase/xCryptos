import { number } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { ASSETS } from '../config';
import styles from './Logo.style';

const Logo = ({ style }) => <Image style={[styles.container, style]} source={ASSETS.logo} />;

Logo.propTypes = {
  style: number,
};

Logo.defaultProps = {
  style: undefined,
};

export default Logo;
