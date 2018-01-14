import 'react-native';
import React from 'react';
import Input from './Input';
import renderer from 'react-native-test-utils';

jest.mock('TouchableOpacity', () => 'TouchableOpacity');

it('renders by default', () => {
  const tree = renderer(<Input />).toJSON();
  expect(tree).toMatchSnapshot();
});
