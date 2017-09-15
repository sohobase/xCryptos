import { func, string } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { C } from '../config';
import Touchable from './Touchable';
import style from './ButtonIcon.style';

const ButtonIcon = (props) => {
  const { icon, onPress } = props;
  return (
    <Touchable onPress={onPress}>
      <Image style={style.icon} source={C.ICON[icon]} />
    </Touchable>
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
