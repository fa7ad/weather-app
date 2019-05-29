import React from 'react';
import axios from 'axios';
import CurrentWeather from '../CurrentWeather';
import Forecasts from '../Forecasts';
import { connect } from 'react-redux';
import { setTheme, setLocation } from '../../actions';

class App extends React.PureComponent<{ setTheme: any; setLocation: any }> {
  componentDidMount() {
    const now = new Date();
    if (now.getHours() > 18 || now.getHours() < 6) {
      this.props.setTheme('dark');
    } else {
      this.props.setTheme('light');
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        axios.get('https://nominatim.openstreetmap.org/reverse', {
          params: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            format: 'json'
          }
        }).then((res) => {
          const { data } = res;
          const { city, country_code } = data.address;
          this.props.setLocation(
            city + ',' + country_code.toUpperCase()
          );
        });
      });
    }
  }

  render() {
    return (
      <>
        <CurrentWeather />
        <Forecasts />
      </>
    );
  }
}

export default connect(
  null,
  { setTheme, setLocation }
)(App);
