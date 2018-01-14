import 'react-native';
import React from 'react';
import Modal from './Modal';
import renderer from 'react-native-test-utils';

jest.mock('TouchableOpacity', () => 'TouchableOpacity');

it('renders by default', () => {
  const tree = renderer(<Modal />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders children', () => {
  const tree = renderer(<Modal>HODL</Modal>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a title', () => {
  const tree = renderer(<Modal title="Up to the moon!" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with a visible false state', () => {
  const tree = renderer(<Modal visible={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('calls onClose prop when close button is pressed', () => {
  const onClose = jest.fn();
  const component = renderer(<Modal onClose={onClose} />);

  component.query('ButtonIcon').simulate('press');

  expect(onClose).toHaveBeenCalled();
});
