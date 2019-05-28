import moment from 'moment';
import axios from 'axios';
import { appid } from '../api';

import { setLocation } from './location';
import { setWeather } from './weather';
import { Weather } from '../reducers/weather';

function toWeather(data: any): Weather {
  return {
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
      icon_name: data.weather[0].id+data.weather[0].icon.slice(-1)
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

  const _today = moment(new Date());
  const _tomorrow = _today.add(1, 'day');
  const _after = _tomorrow.add(1, 'day');

  const todayRaw = data.list.find(
    (el: any) =>
      moment.unix(el.dt).isSame(_today, 'date') &&
      moment.unix(el.dt).isSameOrAfter(_today, 'hour')
  );

  const tomorrowRaw = data.list.find(
    (el: any) =>
      moment.unix(el.dt).isSame(_tomorrow, 'date') &&
      moment.unix(el.dt).isSameOrAfter(_tomorrow, 'hour')
  );

  const afterRaw = data.list.find(
    (el: any) =>
      moment.unix(el.dt).isSame(_after, 'date') &&
      moment.unix(el.dt).isSameOrAfter(_after, 'hour')
  );

  return {
    today: toWeather(todayRaw),
    tomorrow: toWeather(tomorrowRaw),
    after: toWeather(afterRaw)
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
