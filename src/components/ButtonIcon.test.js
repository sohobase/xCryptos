import 'react-native';
import React from 'react';
import ButtonIcon from './ButtonIcon';
import renderer from 'react-native-test-utils';

jest.mock('TouchableOpacity', () => 'TouchableOpacity');

it('renders by default', () => {
  const tree = renderer(<ButtonIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders an icon', () => {
  const tree = renderer(<ButtonIcon icon="sohobase" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('calls onPress prop when pressed', () => {
  const onPress = jest.fn();
  const component = renderer(<ButtonIcon onPress={onPress} />);

  component.query('TouchableOpacity').simulate('press');

  expect(onPress).toHaveBeenCalled();
});
