import React from 'react';

export default function Weather(props) {

    const { current, foreCast, city, country, unit } = props;

    const presentDay = foreCast[0];
    const next5Days = foreCast.slice(1, 6);
    const tempUnit = unit === 'imperial' ? 'F' : 'C';

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
            <div className='weather-app__weather-card'>
                <div className='weather-app__weather-card--current'>
                    <div className='weather-app__weather-card__info-block'>
                        <div className='weather-app__weather-card_title'>
                            {city}, {country}
                        </div>
                        <div className='weather-app__current-weather'>
                            <div className='weather-app__current-weather-time'>
                                {`${new Date().toLocaleString()}`}
                            </div>
                            <div className='weather-app__current-weather-temp-min-max'>
                                Day {Math.ceil(current.main.temp_max)}&deg;{tempUnit} &uarr; &bull; Night {Math.ceil(current.main.temp_min)}&deg;{tempUnit} &darr;
                            </div>
                            <div className='weather-app__current-weather-temp'>
                                <img height={50} width={50} src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`} alt="weather_icon" />
                                {Math.ceil(current.main.temp)}&deg;{tempUnit}
                            </div>
                            <div className="weather-app__current-weather-description">
                                Feels like {Math.ceil(current.main.feels_like)}&deg;{tempUnit}. {current.weather[0].description}
                            </div>
                        </div>
                    </div>
                    <div className='weather-app__weather-card__present-day-forecast'>
                        {
                            presentDay.weather.map(el => {
                                return (
                                    <div className='weather-app__present-day--hourly-forecast' key={el.dt_txt}>
                                        {getTime(el.dt_txt)}
                                        <div className='weather-app__forecast-weather-icon'>
                                            <img height={45} width={45} src={`http://openweathermap.org/img/wn/${el.weather[0].icon}.png`} alt="weather_icon" />
                                        </div>
                                        <div className='weather-app__forecast-weather-description'>
                                            {el.weather[0].description}
                                        </div>
                                        <div className='weather-app__forecast-temp-min-max'>
                                            {Math.ceil(el.main.temp_max)}&deg;{tempUnit}
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
                <div className='weather-app__weather-card--forecast'>
                    <div className='weather-app__weather-card_title'>
                        Next 5 days
                    </div>
                    {
                        next5Days.map((day) => {
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
                                                            {Math.ceil(el.main.temp_max)}&deg;{tempUnit}
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
            </div>
        </>
    )
}
