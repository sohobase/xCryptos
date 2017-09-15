import { number } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import styles from './Logo.style';

const asset = require('../assets/app-logo.png');

const Logo = ({ style }) => <Image style={[styles.container, style]} source={asset} />;

Logo.propTypes = {
  style: number,
};

Logo.defaultProps = {
  style: undefined,
};

export default Logo;
