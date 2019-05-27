import { configureStore } from 'redux-starter-kit';
import { location, weather } from './reducers';

const store = configureStore({
  reducer: {
    location,
    weather
  }
});

export default store;
