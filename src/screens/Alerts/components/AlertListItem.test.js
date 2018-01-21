import 'react-native';
import React from 'react';
import AlertListItem from './AlertListItem';
import renderer from 'react-native-test-utils';

jest.mock('TouchableOpacity', () => 'TouchableOpacity');
jest.mock('../../../components/Amount', () => 'Amount');

const ALERT = { high: 10, low: 5 };

describe('<AlertListItem />', () => {
  it('renders by default', () => {
    const tree = renderer(<AlertListItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders high and low props', () => {
    const tree = renderer(<AlertListItem alert={ALERT} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('passes the onPress prop on the Touchable component', () => {
    const onPress = () => {};
    const component = renderer(<AlertListItem onPress={onPress} />);

    expect(component.query('TouchableOpacity').props.onPress).toEqual(onPress);
  });
});
