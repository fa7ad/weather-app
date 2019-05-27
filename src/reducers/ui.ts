import { createReducer } from 'redux-starter-kit';
import { setTheme } from '../actions/ui';

export interface UIState {
  theme: 'light' | 'dark';
}

const initialState: UIState = {
  theme: 'light'
};

export const ui = createReducer(initialState, {
  [setTheme.type](state, action) {
    state.theme = action.payload;
  }
});

export default ui;
