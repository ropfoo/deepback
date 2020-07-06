import { loggedIn } from './user';

import { combineReducers } from 'redux';

const state = combineReducers({
  loggedIn: loggedIn,
});

export default state;
