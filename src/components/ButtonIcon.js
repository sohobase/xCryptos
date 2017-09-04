import { func, string } from 'prop-types';
import React from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { C } from '../config';
import styles from './ButtonIcon.style';

const ButtonIcon = ({ icon, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <Image style={styles.container} source={C.ICON[icon]} />
    </TouchableHighlight>
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

// <TouchableHighlight onPress={() => navigation.navigate('DrawerOpen')}>
