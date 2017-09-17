import { func, number, string } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { C } from '../config';
import Touchable from './Touchable';
import styles from './ButtonIcon.style';

const ButtonIcon = ({ icon, onPress, style }) => {
  return (
    <Touchable onPress={onPress}>
      <Image style={[styles.icon, style]} source={C.ICON[icon]} />
    </Touchable>
  );
};

ButtonIcon.propTypes = {
  icon: string,
  onPress: func,
  style: number,
};

ButtonIcon.defaultProps = {
  icon: {},
  onPress: undefined,
  style: undefined,
};

export default ButtonIcon;
