import 'react-native';
import React from 'react';
import renderer from 'react-native-test-utils';

import CursorBlink from './index';

jest.mock('TouchableOpacity', () => 'TouchableOpacity');

it('renders by default', () => {
  const tree = renderer(<CursorBlink />).toJSON();
  expect(tree).toMatchSnapshot();
});
