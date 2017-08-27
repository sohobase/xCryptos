import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { AvailableCryptos, Main } from './src/screens';

const App = StackNavigator({
  Home: { screen: Main },
  Currencies: { screen: AvailableCryptos },
});

export default App;
