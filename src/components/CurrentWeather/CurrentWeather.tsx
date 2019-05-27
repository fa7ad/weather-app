import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { MdNearMe } from 'react-icons/md';

import { StoreState } from '../../store';
import { setLocationAndUpdate } from '../../actions/location';
import { Weather } from '../../reducers/weather';

import './CurrentWeather.css';

const Creatable = require('react-select/creatable/dist/react-select.cjs.prod')
  .default;

interface CurrentWeatherProps {
  theme: 'light' | 'dark';
  location: string;
  locationList: string[];
  weather: Weather;
  setLocationAndUpdate: (payload: string) => Promise<void>;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  location,
  locationList,
  theme,
  weather,
  setLocationAndUpdate
}) => {
  const handleLocationChange = (event: { value: string }) => {
    setLocationAndUpdate(event.value.replace(/(,BD)?$/, ',BD'));
  };

  const listLocations = locationList.map(value => ({
    value,
    label: value.replace(',BD', '')
  }));

  return (
    <div className={cx('current-weather', `current-weather--${theme}`)}>
      <Creatable
        onChange={handleLocationChange}
        options={listLocations}
        value={{ value: location, label: location.replace(',BD', '') }}
        components={{
          DropdownIndicator: () => <MdNearMe />,
          IndicatorSeparator: null
        }}
        className='current-weather__location'
        classNamePrefix='location-select'
      />
      <h3>{weather && weather.temp.now}</h3>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  theme: state.ui.theme,
  locationList: state.location.list,
  location: state.location.current,
  weather: state.weather.today
});

export default connect(
  mapStateToProps,
  { setLocationAndUpdate }
)(CurrentWeather);
