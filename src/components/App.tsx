import React, { useEffect, useState } from 'react';
import '../styles/main.scss';

import Header from './header';
import Footer from './footer';
import WeatherCard from './weatherCard';
import Loader from './loader';

type SolStateData = {
	solKeys: string[];
	solInfo: {[key: string]: any};
};

interface SolState {
	weatherData: SolStateData;
	isWeatherLoaded: boolean;
};

const defaultSolState: SolState = {
	weatherData: {
		solKeys: [],
		solInfo: {}
	},
	isWeatherLoaded: false
};

const App: React.FunctionComponent = () => {
	const [ solState, setSolState ] = useState<SolState>(defaultSolState);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = (): void => {
		fetch('https://api.nasa.gov/insight_weather/?api_key=Ev6ELsoEoxkftatf024xaIESSuAlNApZVMG6Y43d&feedtype=json')
			.then((response) => {
				return response.json();
			}).then((data) => {
				setSolState({
					isWeatherLoaded: true,
					weatherData: {
						solInfo: data,
						solKeys: data.sol_keys
					}
				});
			});
	};

	const getWeatherCards = () => 
		solState.weatherData.solKeys.map((key, i) =>
				<WeatherCard key={i} sol={key} solData={solState.weatherData.solInfo[key]} />
		);

	const renderContent = () => {
		if (!solState.isWeatherLoaded) {
			return (
				<div className="fullscreen">
					<Loader />
				</div>
			);
		}

		return (
			<div>
				<div className="content padding">
					<h1>Latest Weather at Elysium Planitia</h1>
					<p>
						InSight is taking daily weather measurements (temperature, wind, pressure) on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars’ equator.
					</p>
				</div>
				<div className="scrollColumn content">
					<div className="contentPadding column">
						{getWeatherCards()}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="view">
			<Header />
			<div className="wrapper">
				{renderContent()}
			</div>
			<div className="planet" />
			<Footer />
		</div>
	);
}

export default App;