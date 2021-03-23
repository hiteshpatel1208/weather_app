import React from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';

export default function Current(props) {

    const { weather, unit } = props;

    const tempUnit = unit === 'imperial' ? 'F' : 'C';

    return (
        <Card className='weather-app__current-weather-card'>
            <CardBody>
                <CardTitle tag="h4">
                    {weather.name}, {weather.sys.country}
                </CardTitle>
                <div className='weather-app__current-weather'>
                    <div className='weather-app__current-weather-time'>
                        {`${new Date().toLocaleString()}`}
                    </div>
                    <div className='weather-app__current-weather-temp-min-max'>
                        Day {Math.ceil(weather.main.temp_max)}&deg;{tempUnit} &uarr; &bull; Night {Math.ceil(weather.main.temp_min)}&deg;{tempUnit} &darr;
                            </div>
                    <div className='weather-app__current-weather-temp'>
                        <img height={50} width={50} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather_icon" />
                        {Math.ceil(weather.main.temp)}&deg;{tempUnit}
                    </div>
                    <div className="weather-app__current-weather-description">
                        Feels like {Math.ceil(weather.main.feels_like)}&deg;{tempUnit}. {weather.weather[0].description}
                    </div>
                </div>
            </CardBody>
        </Card>
    )
};
