import React from 'react';
import { connect } from 'react-redux';

import { StoreState } from '../../store';

const CurrentWeather: React.FC = props => {
  return <div className='current-weather'>Hello, World</div>;
};

const mapStateToProps = (state: StoreState) => ({
  theme: state.ui.theme
});

export default connect(
  mapStateToProps,
  {}
)(CurrentWeather);
