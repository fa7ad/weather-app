import { createReducer } from 'redux-starter-kit';
import { setLocation } from '../actions/location';

type Location = String | Number[];

interface LocationState {
  list: Location[];
  current: Location;
}

const initialState: LocationState = {
  list: [
    'Dhaka, BD',
    'Chittagong, BD',
    'Khulna, BD',
    'Sylhet, BD',
    'Rajshahi, BD',
    'Mymensingh, BD',
    'Barisal, BD',
    'Rangpur, BD',
    'Comilla, BD',
    'Narayanganj, BD',
    'Gazipur, BD'
  ],
  current: 'Dhaka, BD'
};

export const location = createReducer(initialState, {
  [setLocation.type](state, action) {
    state.current = action.payload;
  }
});

export default location;
