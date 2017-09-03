import React from 'react';
import { Button } from 'react-native';
import { C, THEME } from '../../config';

const ButtonDrawer = (props) => {
  const { navigate } = props.navigation;
  return <Button color={THEME.CONTRAST} title="menu" onPress={() => navigate('DrawerOpen')} />;
};

ButtonDrawer.propTypes = {
  navigation: C.SHAPE.NAVIGATION,
};

ButtonDrawer.defaultProps = {
  navigation: {
    navigate() {},
  },
};

export default ButtonDrawer;
