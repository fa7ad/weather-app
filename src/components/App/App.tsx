import React from 'react';
import CurrentWeather from '../CurrentWeather';
import Forecasts from '../Forecasts';
import { connect } from 'react-redux';
import { setTheme, setLocation } from '../../actions';

class App extends React.PureComponent<{ setTheme: any; setLocation: any }> {
  componentDidMount() {
    const now = new Date();
    if (now.getHours() > 17 || now.getHours() < 5) {
      this.props.setTheme('dark');
    } else {
      this.props.setTheme('light');
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        this.props.setLocation(
          position.coords.latitude + ',' + position.coords.longitude
        );
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
