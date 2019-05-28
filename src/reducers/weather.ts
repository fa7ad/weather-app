import { createReducer } from 'redux-starter-kit';
import { setWeather } from '../actions/weather';

export interface Weather {
  date: number;
  temp: {
    now: number;
    min: number;
    max: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  humidity: number | string;
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
    date: +new Date(),
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
  }
});

export default weather;
