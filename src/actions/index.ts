import moment, { Moment } from 'moment';
import axios from 'axios';
import { appid } from '../api';

import { setLocation } from './location';
import { setWeather } from './weather';
import { Weather } from '../reducers/weather';

function toWeather(data: any): Weather {
  return {
    date: data.dt * 1000,
    temp: {
      now: Math.round(data.main.temp),
      min: Math.round(data.main.temp_min),
      max: Math.round(data.main.temp_max)
    },
    wind: data.wind,
    humidity: data.main.humidity,
    icon: {
      main: data.weather[0].main,
      description: data.weather[0].description,
      icon_name: (
        data.weather[0].id +
        '-' +
        data.weather[0].icon.slice(-1)
      ).replace(/(-[0-9])$/, '')
    }
  };
}

async function fetchWeather(location: string) {
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

  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/forecast',
    { params }
  );

  const revList = [].slice.call(data.list);

  const _today = moment();
  const _tomorrow = moment();
  const _after = moment();

  _tomorrow.add(1, 'day');
  _after.add(2, 'days');

  const findDay = (day: Moment) => (el: any) => {
    const dt = moment.unix(el.dt).utc();
    return dt.isSame(day, 'day');
  };

  const todayRaw = revList.filter(findDay(_today)).slice(-1);
  const tomorrowRaw = revList.filter(findDay(_tomorrow)).slice(-1);
  const afterRaw = revList.filter(findDay(_after)).slice(-1);

  return {
    today: toWeather(todayRaw[0]),
    tomorrow: toWeather(tomorrowRaw[0]),
    after: toWeather(afterRaw[0])
  };
}

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

  return fetchWeather(location)
    .then(states => dispatch(setWeather(states)))
    .catch(console.error);
};

export { setLocation } from './location';
export { setWeather } from './weather';
export { setDarkTheme, setLightTheme, setTheme } from './ui';
