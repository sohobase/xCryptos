import { func, number } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import VirtualButton from './VirtualButton';
import styles from './VirtualKeyboard.style';

const NUMBERS = [7, 8, 9, 4, 5, 6, 1, 2, 3];

class VirtualKeyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this._onNumber = this._onNumber.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  _onNumber(digit) {
    const { onChange } = this.props;
    let { value = 0 } = this.props;
    value = value !== 0 ? parseFloat(`${value}${digit}`) : digit;
    onChange(value || 0);
  }

  _onDelete() {
    const { onChange, value } = this.props;

    const nextValue = value.length > 1 ? parseFloat(value.toString().slice(0, -1)) : 0;
    onChange(nextValue);
  }

  render() {
    return (
      <View style={styles.container}>
        {
          NUMBERS.map(num => (
            <VirtualButton key={num} value={num} onPress={this._onNumber} />
          ))
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
  onChange() {},
  value: 0,
};

export default VirtualKeyboard;
