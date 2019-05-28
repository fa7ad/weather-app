import React from 'react';

interface ForecastProps {
  day: string|number;
  temp: string|number;
  icon: string;
}

export const Forecast: React.FC<ForecastProps> = props => (
  <div className='forecast-item__root'>
    <div className='forecast-item__day'>{props.day}</div>
    <div className='forecast-item__forecast'>
      <div className='forecast-item__temperature'>
        {props.temp}
        <sup>&deg;</sup>
      </div>
      <i className={`forecast-item__icon owf owf-${props.icon}`} />
    </div>
  </div>
);
