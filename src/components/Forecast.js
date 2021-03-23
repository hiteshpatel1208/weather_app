import React from 'react'
import { Card, CardTitle, CardBody } from 'reactstrap';

export default function Forecast(props) {

    const { weather, unit } = props;

    const tempUnit = unit === 'imperial' ? 'F' : 'C';

    const normalizeForecast = () => {
        weather.list.forEach(record => {
            return record.date = new Date(`${record.dt_txt}`).toLocaleDateString();
        });
        const groupedForecastByDate = weather.list.reduce((rv, obj) => {
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
            <Card className='weather-app__forecast-card'>
                <CardBody>
                    <CardTitle tag="h4">
                        5 day forecast for {weather.city.name}, {weather.city.country}
                    </CardTitle>
                    <div className='weather-app__forecast'>
                        {
                            normalizeForecast().map((day) => {
                                return (
                                    <div className='weather-app__forecast-container' key={day.date}>
                                        <div className='weather-app__forecast-date'>
                                            {day.date}
                                        </div>
                                        <div className='weather-app__forecast-day'>
                                            {
                                                day.weather.map(el => {
                                                    return (
                                                        <div className='weather-app__forecast-day--hourly-forecast' key={el.dt_txt}>
                                                            {getTime(el.dt_txt)}
                                                            <div className='weather-app__forecast-weather-icon'>
                                                                <img height={45} width={45} src={`http://openweathermap.org/img/wn/${el.weather[0].icon}.png`} alt="weather_icon" />
                                                            </div>
                                                            <div className='weather-app__forecast-weather-description'>
                                                                {el.weather[0].description}
                                                            </div>
                                                            <div className='weather-app__forecast-temp-min-max'>
                                                                {Math.ceil(el.main.temp_max)}&deg;{tempUnit} / {Math.ceil(el.main.temp_min)}&deg;{tempUnit}
                                                            </div>
                                                            <div className='weather-app__forecast-weather-pop'>
                                                                Prec: {Math.ceil(el.pop * 100)}%
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </CardBody>
            </Card>
        </>
    )
}
