import React from 'react';
import CurrentWeather from '../CurrentWeather';
import Forecasts from '../Forecasts';

const App: React.FC = props => {
  return (
    <>
      <CurrentWeather />
      <Forecasts />
    </>
  );
};

export default App;
