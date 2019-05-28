import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../store';
import { Forecast } from './Forecast';
import moment from 'moment';

import './Forecasts.css'

interface ForecastsProps {
  today: any;
  tomorrow: any;
  after: any;
}

class Forecasts extends Component<ForecastsProps> {
  render() {
    const { today, tomorrow, after } = this.props;

    return (
      <div className='forecasts__root'>
        <Forecast
          day={moment(today.date).format('dddd')}
          icon={today.icon.icon_name}
          temp={today.temp.now}
        />
        {tomorrow && (
          <Forecast
            day={moment(tomorrow.date).format('dddd')}
            icon={tomorrow.icon.icon_name}
            temp={tomorrow.temp.now}
          />
        )}
        {after && (
          <Forecast
            day={moment(after.date).format('dddd')}
            icon={after.icon.icon_name}
            temp={after.temp.now}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  today: state.weather.today,
  tomorrow: state.weather.tomorrow,
  after: state.weather.after
});

export default connect(
  mapStateToProps,
  null
)(Forecasts);
