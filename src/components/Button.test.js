import 'react-native';
import React from 'react';
import Button from './Button';
import renderer from 'react-native-test-utils';

jest.mock('TouchableOpacity', () => 'TouchableOpacity');

it('renders by default', () => {
  const tree = renderer(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a caption', () => {
  const tree = renderer(<Button caption="xCryptos rocks!" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('calls onPress prop when pressed', () => {
  const onPress = jest.fn();
  const component = renderer(<Button onPress={onPress} />);

  component.query('TouchableOpacity').simulate('press');

  expect(onPress).toHaveBeenCalled();
});

describe('when disabled', () => {
  it('renders with disabled stlyes', () => {
    const tree = renderer(<Button disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('does not attach onPress if disabled', () => {
  const onPress = jest.fn();
  const component = renderer(<Button disabled onPress={onPress} />);

  expect(component.query('TouchableOpacity').props.onPress).toBeUndefined();
});
});

