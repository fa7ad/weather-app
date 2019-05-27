import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { StoreState } from '../../store';

import './CurrentWeather.css';

interface CurrentWeatherProps {
  theme: 'light' | 'dark';
}

const CurrentWeather: React.FC<CurrentWeatherProps> = props => {
  return (
    <div
      className={cx(
        'current-weather',
        { 'current-weather--dark': props.theme === 'dark' },
        { 'current-weather--light': props.theme === 'light' }
      )}>
      Hello, World
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  theme: state.ui.theme
});

export default connect(
  mapStateToProps,
  {}
)(CurrentWeather);
