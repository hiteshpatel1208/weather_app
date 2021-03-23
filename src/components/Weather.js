import React from 'react';

export default function Weather(props) {

    const { current, foreCast, city, country, unit } = props;

    const presentDay = foreCast[0];
    const next5Days = foreCast.slice(1, 6);
    const tempUnit = unit === 'imperial' ? 'F' : 'C';
    const windUnit = unit === 'imperial' ? 'mph' : 'm/s'

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

    const getCompassDirection = (deg) => {
        const ndx = Math.floor((deg / 22.5) + 0.5);
        const directionArr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        return directionArr[ndx];
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
                                <img height={75} width={75} src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`} alt='weather_icon' />
                                {Math.ceil(current.main.temp)}&deg;{tempUnit}
                            </div>
                            <div className='weather-app__current-weather-description'>
                                Feels like {Math.ceil(current.main.feels_like)}&deg;{tempUnit}. {current.weather[0].description}
                            </div>
                            <div className='weather-app__current-weather-wind'>
                                <svg viewBox="0 0 1000 1000" height={15} width={15} style={{transform: `rotate(${current.wind.deg}deg)`}}>
                                    <g data-v-47880d39="" fill="#48484a">
                                        <path d="M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z"></path>
                                        <path d="M817.2,990c-8.3,0-16.6-3.3-26.5-9.9L497.2,769.5c-5-3.3-18.2-3.3-23.2,0L210.3,976.7c-19.9,16.6-41.5,14.9-51.4,0c-6.6-9.9-8.3-21.6-3.3-38.1L449.1,39.8C459,13.3,477.3,10,483.9,10c6.6,0,24.9,3.3,34.8,29.8l325,898.7c5,14.9,5,28.2-1.7,38.1C837.1,985,827.2,990,817.2,990z M485.6,716.4c14.9,0,28.2,5,39.8,11.6l255.4,182.4L485.6,92.9l-267,814.2l223.9-177.4C454.1,721.4,469,716.4,485.6,716.4z"></path>
                                    </g>
                                </svg>
                                {' '}
                                {`${current.wind.speed} ${windUnit} ${getCompassDirection(current.wind.deg)}, Visibility: ${current.visibility/1000}Km`}
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
                                            <img height={45} width={45} src={`http://openweathermap.org/img/wn/${el.weather[0].icon}.png`} alt='weather_icon' />
                                        </div>
                                        <div className='weather-app__forecast-weather-description'>
                                            {el.weather[0].main}
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
                        5-day forecast
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
                                                            <img height={45} width={45} src={`http://openweathermap.org/img/wn/${el.weather[0].icon}.png`} alt='weather_icon' />
                                                        </div>
                                                        <div className='weather-app__forecast-weather-description'>
                                                            {el.weather[0].main}
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
