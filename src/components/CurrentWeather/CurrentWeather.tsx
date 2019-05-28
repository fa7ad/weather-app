import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { MdNearMe, MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { WiRaindrop } from 'react-icons/wi';

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
        <div className='current-weather__temperature'>
          <div className='current-weather__minmax'>
            <MdArrowUpward />
            {weather.temp.max}
            <sup>&deg;</sup>&nbsp;
            <MdArrowDownward />
            {weather.temp.min}
            <sup>&deg;</sup>
          </div>
          {weather.temp.now}
          <sup>&deg;</sup>
        </div>
        <div className='current-weather__icon'>
          {weather.icon.main}
          <br />
          <i className={`owf owf-5x owf-${weather.icon.icon_name}`} />
        </div>
        <div className='current-weather__humidity' title='Humidity'>
          <WiRaindrop size='2em' /> {weather.humidity} %
        </div>
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
