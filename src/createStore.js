import { compose, createStore } from 'redux';
import { autoRehydrate } from 'redux-persist';

import reducer from './reducer';

export default () => (
  createStore(reducer, undefined, compose(autoRehydrate()))
);
