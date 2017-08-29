import { func, number,  } from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import VirtualButton from './VirtualButton';

const NUMBERS = [7, 8, 9, 4, 5, 6, 1, 2, 3];

const styles = StyleSheet.create({
  container: {
    height: '50%',
    minHeight: '50%',
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
});

class VirtualKeyboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  _onNumber = (digit) => {
    let { onChange, value = 0 } = this.props;
    value = value !== 0 ? parseFloat(`${value}${digit}`) : digit;
    onChange && onChange(value);
  }

  _onDecimal = () => {

  }

  _onDelete = () => {
    const { onChange, value } = this.props;
    onChange && onChange(parseFloat(value.toString().slice(0, -1)));
  }

  render() {
    return (
      <View style={styles.container}>
        {
          NUMBERS.map((num) => {
            return <VirtualButton key={num} value={num} onPress={this._onNumber} />;
          })
        }
        <VirtualButton caption="." onPress={this._onDecimal} />
        <VirtualButton value={0} onPress={this._onNumber} />
        <VirtualButton caption="<" onPress={this._onDelete} />
      </View>
    );
  }
}

VirtualKeyboard.propTypes = {
  onChange: func,
  value: number,
};

VirtualKeyboard.defaultProps = {
  onChange: undefined,
  value: 0,
};

export default VirtualKeyboard;
