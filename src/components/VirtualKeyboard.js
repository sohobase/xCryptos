import { bool, func, string } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { STYLE } from '../config';
import VirtualButton from './VirtualButton';
import styles from './VirtualKeyboard.style';

const NUMBERS = [7, 8, 9, 4, 5, 6, 1, 2, 3];

class VirtualKeyboard extends Component {
  constructor(props) {
    super(props);
    this._onDelete = this._onDelete.bind(this);
    this._onDecimal = this._onDecimal.bind(this);
    this._onNumber = this._onNumber.bind(this);
  }

  _onNumber(digit) {
    const { decimal, onChange, value } = this.props;
    let nextValue = digit;

    nextValue = `${value !== '0' || decimal ? value : ''}${decimal ? '.' : ''}${digit}`;
    onChange({ value: nextValue, decimal: false });
  }

  _onDelete() {
    const { decimal, onChange, value } = this.props;
    let nextValue = '0';

    if (value.length > 1) nextValue = decimal ? value : value.slice(0, -1);
    onChange({ value: nextValue, decimal: false });
  }

  _onDecimal() {
    const { onChange, value } = this.props;

    onChange({ value, decimal: !value.includes('.') });
  }

  render() {
    const { _onDecimal, _onDelete, _onNumber } = this;

    return (
      <View style={[STYLE.LAYOUT_SECONDARY, styles.container]}>
        { NUMBERS.map(num => <VirtualButton key={num} value={num} onPress={_onNumber} />) }
        <VirtualButton caption="." onPress={_onDecimal} />
        <VirtualButton value={0} onPress={_onNumber} />
        <VirtualButton icon="back" onPress={_onDelete} />
      </View>
    );
  }
}

VirtualKeyboard.propTypes = {
  decimal: bool,
  onChange: func,
  value: string,
};

VirtualKeyboard.defaultProps = {
  decimal: false,
  onChange() {},
  value: 0,
};

export default VirtualKeyboard;
