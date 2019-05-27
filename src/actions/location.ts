import { createAction } from 'redux-starter-kit';
import qs from 'qs';
import { appid, apiUrl } from '../api';
import { Weather } from '../reducers/weather';
import { setToday } from './weather';

export const setLocation = createAction('SET_LOCATION');

export const setLocationAndUpdate = (location: string) => (
  dispatch: (action: any) => void
) => {
  const params = {
    appid,
    units: 'metric'
  };
  if (/[a-zA-z]/.test(location)) {
    Object.assign(params, { q: location });
  } else {
    const [lat, lon] = location.split(',');
    Object.assign(params, { lat, lon });
  }

  dispatch(setLocation(location));

  return fetch(`${apiUrl}?${qs.stringify(params)}`)
    .then(res => res.json())
    .then(data => {
      const today: Weather = {
        temp: {
          now: data.main.temp,
          min: data.main.temp_min,
          max: data.main.temp_max
        },
        wind: data.wind,
        humidity: data.main.humidity,
        icon: {
          main: data.weather[0].main,
          description: data.weather[0].description,
          icon_name: data.weather[0].icon
        }
      };

      dispatch(setToday(today));
    });
};
