import React from 'react';
import { Card, CardTitle, CardBody, Col } from 'reactstrap';

export default function Tile(props) {

    const { weather, forecast } = props;

    const normalizeForecast = () => {
        forecast.list.forEach(record => {
            return record.date = new Date(`${record.dt_txt}`).toLocaleDateString();
        });
        const groupedForecastByDate = forecast.list.reduce((rv, obj) => {
            (rv[obj['date']] = rv[obj['date']] || []).push(obj);
            return rv
        }, {});
        const hourlyWhether = [];
        for (const [k, v] of Object.entries(groupedForecastByDate)) {
            hourlyWhether.push({
                'date': k,
                'weather': v
            });
        }
        return hourlyWhether;
    }

    const getTime = (date) => {
        const hours = new Date(date).getHours();
        if (hours > 0 && hours < 12) {
            return `${hours} AM`;
        } else if (hours > 12) {
            return `${hours - 12} PM`;
        } else {
            return hours === 0 ? '12 AM' : '12 PM';
        }
    }

    return (
        <>
            <Col md={4} xs={12}>
                <Card className='weather-app_current-weather-card'>
                    <CardBody>
                        <CardTitle tag="h4">
                            Current weather for {weather.name}, {weather.sys.country}
                        </CardTitle>
                        <div className='weather-app_current-weather'>
                            <div className='weather-app_current-weather-time'>
                                {`${new Date().toLocaleString()}`}
                            </div>
                            <div className='weather-app_current-weather-temp-min-max'>
                                {`Day ${Math.ceil(weather.main.temp_max)}`}&deg;F &uarr; &#x25CF; {`Night ${Math.ceil(weather.main.temp_min)}`}&deg;F &darr;
                            </div>
                            <div className='weather-app_current-weather-temp'>
                                <img height={100} width={100} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather_icon" />
                                {`${Math.ceil(weather.main.temp)}`}&deg;F
                            </div>
                            <div className="weather-app_current-weather-description">
                                Feels like {Math.ceil(weather.main.feels_like)}&deg;F. {weather.weather[0].description}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xs={12}>
                <Card className='weather-app_forecast-card'>
                    <CardBody>
                        <CardTitle tag="h4">
                            5 day forecast for {forecast.city.name}, {forecast.city.country}
                        </CardTitle>
                        <div className='weather-app_forecast'>
                            {
                                normalizeForecast().map((day) => {
                                    return (
                                        <>
                                            <div className='weather-app_forecast-container' key={day}>
                                                <div className='weather-app_forecast-date'>
                                                    {day.date}
                                                </div>
                                                <div className='weather-app_forecast-day'>
                                                    {
                                                        day.weather.map(el => {
                                                            return (
                                                                <>
                                                                    <div className='weather-app_forecast-day--hourly-forecast'>
                                                                        {`${getTime(el.dt_txt)}`}
                                                                        <div className='weather-app_forecast-weather-icon'>
                                                                            <img height={75} width={75} src={`http://openweathermap.org/img/wn/${el.weather[0].icon}.png`} alt="weather_icon" />
                                                                        </div>
                                                                        <div className='weather-app_forecast-weather-description'>
                                                                            {`${el.weather[0].description}`}
                                                                        </div>
                                                                        <div className=''>
                                                                            {Math.ceil(el.main.temp_max)}&deg;F / {Math.ceil(el.main.temp_min)}&deg;F
                                                                        </div>
                                                                        <div className=''>
                                                                            Precp: {Math.ceil(el.pop * 100)}%
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    );
                                })
                            }
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
};
