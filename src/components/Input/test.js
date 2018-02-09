import 'react-native';
import React from 'react';
import renderer from 'react-native-test-utils';

import Input from './index';

jest.mock('TouchableOpacity', () => 'TouchableOpacity');

it('renders by default', () => {
  const tree = renderer(<Input />).toJSON();
  expect(tree).toMatchSnapshot();
});
