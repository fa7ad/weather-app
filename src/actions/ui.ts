import { createAction } from 'redux-starter-kit';

export const setTheme = createAction('SET_THEME');

export const setDarkTheme = () => setTheme('dark');

export const setLightTheme = () => setTheme('light');
