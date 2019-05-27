import { createReducer } from 'redux-starter-kit';
import {
  setToday,
  setWeather,
  setTomorrow,
  setAfter
} from '../actions/weather';

export interface Weather {
  temp: {
    now: Number;
    min: Number;
    max: Number;
  };
  wind: {
    speed: Number;
    deg: Number;
  };
  humidity: Number | string;
  icon: {
    main: string;
    description: string;
    icon_name: string;
  };
}

export interface WeatherState {
  today: Weather;
  tomorrow?: Weather;
  after?: Weather;
}

const initialState: WeatherState = {
  today: {
    temp: {
      now: 0,
      min: 0,
      max: 0
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
