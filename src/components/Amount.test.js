import 'react-native';
import React from 'react';
import { Amount } from './Amount';
import renderer from 'react-test-renderer';

it('renders by default', () => {
  const tree = renderer.create(<Amount />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with a custom amount', () => {
  const tree = renderer.create(<Amount value={7.77} />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('when currency is USD', () => {
  it('renders currency before amount', () => {
    const currency = 'USD';
    const tree = renderer.create(<Amount settings={{ currency }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('when currency is not USD', () => {
  it('renders currency after amount', () => {   
    const currency = 'EUR';
    const tree = renderer.create(<Amount settings={{ currency }} />).toJSON();
    
    expect(tree).toMatchSnapshot();
  });
});
