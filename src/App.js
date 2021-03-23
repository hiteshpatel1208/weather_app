import React, { useEffect, useRef, useState } from 'react';
import ZipInputForm from "./components/form";
import { Col, Container, Row } from 'reactstrap';
import Unit from './components/Unit';
import Weather from './components/Weather';
import './App.scss';

function App() {

	const [zipToSearch, setZipToSearch] = useState();
	const [curWeather, setCurWeather] = useState({ cod: '404' });
	const [forecastWeather, setForecastWeather] = useState({ cod: '404' });
	const [unit, setUnit] = useState('imperial');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');

	const apiKey = 'fa56bfa56d667c9243a012b42283ad11';
	const isMounted = useRef(false);
	
	useEffect(() => {
		const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipToSearch}&appId=${apiKey}&units=${unit}`;
		const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipToSearch}&appId=${apiKey}&units=${unit}`;
		
		if(isMounted.current) {
			fetch(currentWeatherUrl)
				.then(res => res.json())
				.then(res => {
					setCity(res.name);
					setCountry(res.sys.country);
					setCurWeather(res);
				})
				.catch(err => console.log(err));
			
			fetch(forecastWeatherUrl)
				.then(res => res.json())
				.then(res => {
					res.list.forEach(record => {
						return record.date = new Date(`${record.dt_txt}`).toLocaleDateString();
					});
					const groupedForecastByDate = res.list.reduce((rv, obj) => {
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
					setForecastWeather(hourlyWhether);
				})
				.catch(err => console.log(err));
			
		} else {
			isMounted.current = true;
		}
		
	}, [zipToSearch, unit]);
	
	const submit = (zip) => {
		setZipToSearch(zip);
	}

	const unitSetter = (val) => {
		setUnit(val);
	}

	return (
		<div className='weather-app'>
			<Container>
				<Row>
					<Col sm={11} xs={9}>
						<ZipInputForm formSubmit={submit} />
					</Col>
					<Col sm={1} xs={3} style={{textAlign: 'end'}}>
						<Unit unitSetter={unitSetter} />
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						{curWeather.cod!== '404' && forecastWeather.cod !== '404' && (
							<Weather current={curWeather} foreCast={forecastWeather} city={city} country={country} unit={unit} />
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;
