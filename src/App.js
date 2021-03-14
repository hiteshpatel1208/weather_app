import React, { useEffect, useState } from 'react';
import ZipInputForm from "./components/form";
import Tile from "./components/tile";
import './App.scss';

function App() {

	const [zipToSearch, setZipToSearch] = useState();
	const [curWeather, setCurWeather] = useState({ cod: '404'});
	const [forecastWeather, setForecastWeather] = useState({});
	const [unit, setUnit] = useState('imperial');

	const apiKey = 'fa56bfa56d667c9243a012b42283ad11';

	const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipToSearch}&appId=${apiKey}&units=${unit}`;
	const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipToSearch}&appId=${apiKey}&units=${unit}`;

	const submit = (zip,unit) => {
		setZipToSearch(zip);
		setUnit(unit);
	}

	useEffect(() => {
		fetch(currentWeatherUrl)
			.then(res => res.json())
			.then(res => setCurWeather(res))
			.catch(err => console.log(err));
		
		fetch(forecastWeatherUrl)
			.then(res => res.json())
			.then(res => setForecastWeather(res))
			.catch(err => console.log(err));
		
	}, [zipToSearch, currentWeatherUrl, forecastWeatherUrl]);

	return (
		<div className='weather-app'>
			<ZipInputForm formSubmit={submit} />
			{ curWeather.cod !== '404' && forecastWeather.cod !== '404' && (
				<Tile weather={curWeather} forecast={forecastWeather} unit={unit} />
			)}
		</div>
	);
}

export default App;
