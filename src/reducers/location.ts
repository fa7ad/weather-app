import { createReducer } from 'redux-starter-kit';
import { setLocation } from '../actions/location';

export const location = createReducer('Dhaka,BD', {
  [setLocation.type](state, action) {
    Object.assign(state, action.payload);
  }
});

export default location;
