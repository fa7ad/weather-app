import React from 'react';
import CurrentWeather from '../CurrentWeather';
import Forecasts from '../Forecasts';
import { connect } from 'react-redux';
import { setTheme } from '../../actions';

class App extends React.PureComponent<{ setTheme: any }> {
  componentDidMount() {
    const now = new Date();
    if (now.getHours() > 17 || now.getHours() < 5) {
      this.props.setTheme('dark');
    } else {
      this.props.setTheme('light');
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
  { setTheme }
)(App);
