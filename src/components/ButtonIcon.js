import { func, string } from 'prop-types';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { C } from '../config';
import style from './ButtonIcon.style';

const ButtonIcon = ({ icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={style.icon} source={C.ICON[icon]} />
    </TouchableOpacity>
  );
};

ButtonIcon.propTypes = {
  icon: string,
  onPress: func,
};

ButtonIcon.defaultProps = {
  icon: {},
  onPress: undefined,
};

export default ButtonIcon;
