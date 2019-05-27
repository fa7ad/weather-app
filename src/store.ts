import { configureStore } from 'redux-starter-kit';
import { location, weather, ui } from './reducers';
import { LocationState } from './reducers/location';
import { WeatherState } from './reducers/weather';
import { UIState } from './reducers/ui';

const store = configureStore({
  reducer: {
    location,
    weather,
    ui
  }
});

export default store;

export interface StoreState {
  location: LocationState;
  weather: WeatherState;
  ui: UIState;
}
