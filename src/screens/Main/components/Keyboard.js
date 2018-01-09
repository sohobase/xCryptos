import { bool, func, string } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { ButtonIcon, Touchable } from '../../../components';
import { STYLE, THEME } from '../../../config';
import styles from './Keyboard.style';

const { MOTION } = THEME;
const Button = ({
  caption, icon, value, onPress, // eslint-disable-line
}) => (
  <Touchable
    onPress={() => onPress(value)}
    style={[STYLE.CENTERED, styles.button]}
    underlayColor="rgba(0,0,0,0.1)"
  >
    { icon
      ? <ButtonIcon icon={icon} onPress={() => onPress(value)} style={styles.icon} />
      : <Text style={styles.caption}>{caption || value.toString()}</Text> }
  </Touchable>
);
const NUMBERS = [7, 8, 9, 4, 5, 6, 1, 2, 3];

class Keyboard extends Component {
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
    const {
      _onDecimal, _onDelete, _onNumber,
      props: { active },
    } = this;

    return (
      <Motion
        {...MOTION.DEFAULT}
        animation={active ? 'bounceInUp' : 'bounceOutDown'}
        style={styles.container}
      >
        <View style={styles.content}>
          { NUMBERS.map(num => <Button key={num} value={num} onPress={_onNumber} />) }
          <Button caption="." onPress={_onDecimal} />
          <Button value={0} onPress={_onNumber} />
          <Button icon="back" onPress={_onDelete} />
        </View>
      </Motion>
    );
  }
}

Keyboard.propTypes = {
  active: bool,
  decimal: bool,
  onChange: func,
  value: string,
};

Keyboard.defaultProps = {
  active: true,
  decimal: false,
  onChange() {},
  value: 0,
};

export default Keyboard;
