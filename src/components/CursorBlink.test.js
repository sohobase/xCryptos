import 'react-native';
import React from 'react';
import CursorBlink from './CursorBlink';
import renderer from 'react-native-test-utils';

jest.mock('TouchableOpacity', () => 'TouchableOpacity');

it('renders by default', () => {
  const tree = renderer(<CursorBlink />).toJSON();
  expect(tree).toMatchSnapshot();
});
