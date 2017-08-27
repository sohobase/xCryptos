import { func } from 'prop-types';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React from 'react';

const NUMBERS = [7, 8, 9, 4, 5, 6, 1, 2, 3];

const styles = StyleSheet.create({
  container: {
    minHeight: '40%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },

  button: {
    width: '33%',
    height: '25%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    // borderTopWidth: 1,
    // borderTopColor: '#777',
    // borderRightWidth: 1,
    // borderRightColor: '#666',
  },

  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const VirtualButton = ({ value, onPress }) => {
  return (
    <TouchableHighlight
      accessibilityRole="button"
      key={value}
      onPress={onPress.bind(null, value)}
      style={styles.button}
      underlayColor="rgba(0,0,0,0.25)"
    >
      <Text style={styles.label}>{value}</Text>
    </TouchableHighlight>
  );
};

const VirtualKeyboard = ({onNumber, onDelete}) => {
  return (
    <View style={styles.container}>
      {
        NUMBERS.map((number) => {
          return <VirtualButton key={number} value={number} onPress={onNumber} />;
        })
      }
      <VirtualButton value="." onPress={onNumber} />
      <VirtualButton value={0} onPress={onNumber} />
      <VirtualButton value="<" onPress={onDelete} />
    </View>
  );
};

VirtualKeyboard.propTypes = {
  onNumber: func,
  onDelete: func,
};

VirtualKeyboard.defaultProps = {
  onNumber: undefined,
  onDelete: undefined,
};

export default VirtualKeyboard;
