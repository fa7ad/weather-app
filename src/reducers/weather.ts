import { createReducer } from 'redux-starter-kit';
import {
  setToday,
  setWeather,
  setTomorrow,
  setAfter
} from '../actions/weather';

interface Weather {
  temp: {
    now: Number;
    min: Number;
    mix: Number;
  };
  wind: {
    speed: Number;
    deg: Number;
  };
  humidity: Number | String;
  icon: {
    main: String;
    description: String;
    icon_name: String;
  };
}

interface WeatherState {
  today?: Weather;
  tomorrow?: Weather;
  after?: Weather;
}

const initialState: WeatherState = {
  today: {
    temp: {
      now: 0,
      min: 0,
      mix: 0
    },
    wind: {
      speed: 0,
      deg: 0
    },
    humidity: '0%',
    icon: {
      main: 'Clear',
      description: 'clear sky',
      icon_name: '01d'
    }
  }
};

export const weather = createReducer(initialState, {
  [setWeather.type](state, action) {
    Object.assign(state, action.payload);
  },
  [setToday.type](state, action) {
    Object.assign(state.today, action.payload);
  },
  [setTomorrow.type](state, action) {
    Object.assign(state.tomorrow, action.payload);
  },
  [setAfter.type](state, action) {
    Object.assign(state.after, action.payload);
  }
});

export default weather;
