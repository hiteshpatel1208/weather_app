import React, { useEffect, useRef, useState } from 'react';
import ZipInputForm from "./components/Form";
import Current from "./components/Current";
import './App.scss';
import { Col, Container, Row } from 'reactstrap';
import Forecast from './components/Forecast';
import Unit from './components/Unit';

function App() {

	const [zipToSearch, setZipToSearch] = useState();
	const [curWeather, setCurWeather] = useState({ cod: '404' });
	const [forecastWeather, setForecastWeather] = useState({ cod: '404' });
	const [unit, setUnit] = useState('imperial');

	const apiKey = 'fa56bfa56d667c9243a012b42283ad11';
	const isMounted = useRef(false);
	
	useEffect(() => {
		const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipToSearch}&appId=${apiKey}&units=${unit}`;
		const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipToSearch}&appId=${apiKey}&units=${unit}`;
		
		if(isMounted.current) {
			fetch(currentWeatherUrl)
			.then(res => res.json())
			.then(res => setCurWeather(res))
			.catch(err => console.log(err));
			
			fetch(forecastWeatherUrl)
			.then(res => res.json())
			.then(res => setForecastWeather(res))
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
					<Col sm={11} xs={12}>
						<ZipInputForm formSubmit={submit} />
					</Col>
					<Col sm={1} xs={12} style={{textAlign: 'end'}}>
						<Unit unitSetter={unitSetter} />
					</Col>
				</Row>
				<Row>
					<Col md={4}>
						{curWeather.cod !== '404' && (
							<Current weather={curWeather} unit={unit} />
						)}
					</Col>
					<Col md={8}>
						{forecastWeather.cod !== '404' && (
							<Forecast weather={forecastWeather} unit={unit} />
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;
