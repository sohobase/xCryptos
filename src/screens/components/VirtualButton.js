import { func, number, string } from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '33%',
    height: '25%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const VirtualButton = ({ caption, value, onPress }) => {
  return (
    <TouchableHighlight
      __accessibilityRole="button"
      key={value}
      onPress={onPress.bind(null, value)}
      style={styles.container}
      underlayColor="rgba(0,0,0,0.1)"
    >
      <Text style={styles.text}>{caption || value.toString()}</Text>
    </TouchableHighlight>
  );
};

VirtualButton.propTypes = {
  caption: string,
  onPress: func,
  value: number,
};

VirtualButton.defaultProps = {
  caption: undefined,
  onPress: undefined,
  value: undefined,
};

export default VirtualButton;
