import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { MdNearMe } from 'react-icons/md';

import { StoreState } from '../../store';
import { Weather } from '../../reducers/weather';
import { setLocationAndUpdate } from '../../actions';

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

class CurrentWeather extends React.PureComponent<CurrentWeatherProps> {
  timer: NodeJS.Timeout = setTimeout(() => {}, 0);

  handleLocationChange = (event: { value: string }) => {
    this.props.setLocationAndUpdate(event.value.replace(/(,BD)?$/, ',BD'));
  };

  listLocations = this.props.locationList.map(value => ({
    value,
    label: value.replace(',BD', '')
  }));

  componentDidMount() {
    this.props.setLocationAndUpdate(this.props.location);
    this.timer = setInterval(
      () => this.props.setLocationAndUpdate(this.props.location),
      5e3
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { location, theme, weather } = this.props;

    return (
      <div className={cx('current-weather', `current-weather--${theme}`)}>
        <Creatable
          onChange={this.handleLocationChange}
          options={this.listLocations}
          value={{ value: location, label: location.replace(',BD', '') }}
          components={{
            DropdownIndicator: () => <MdNearMe />,
            IndicatorSeparator: null
          }}
          className='current-weather__location'
          classNamePrefix='location-select'
        />
        
        <h1 className='current-weather__temperature'>
          {weather.temp.now}
          <sup>&deg;</sup>
        </h1>
      </div>
    );
  }
}

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
