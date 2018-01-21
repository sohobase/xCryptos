import React from 'react';
import renderer from 'react-native-test-utils';

jest.mock('TouchableOpacity', () => 'TouchableOpacity');
jest.mock('TouchableNativeFeedback', () => 'TouchableNativeFeedback');

let Touchable;

describe('when Platorm.OS is ios', () => {
  beforeEach(() => {
    jest.resetModules();

    const reactNative = require('react-native');
    reactNative.Platform.OS = 'ios';

    Touchable = require.requireActual('./Touchable').default;
  });

  it('renders a TouchableOpacity component', () => {
    const tree = renderer(<Touchable />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('when Platorm.OS is not ios', () => {
  beforeEach(() => {
    jest.resetModules();

    const reactNative = require('react-native');
    reactNative.Platform.OS = 'android';

    Touchable = require.requireActual('./Touchable').default;
  });

  it('renders a TouchableNativeFeedback component', () => {
    const tree = renderer(<Touchable />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

