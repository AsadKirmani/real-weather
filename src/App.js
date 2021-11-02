import './App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Container } from '@mui/material';
import Loader from './components/Loader';
import Weather from './components/Weather';
import Header from './components/Header';
import DailyForecastDetails from './components/DailyForecastDetails';

export default function App() {

  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [searchedTemp, setSearchedTemp] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [temprature, setTemprature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [UVI, setUVI] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [icon, setIcon] = useState('');
  const [weather, setWeather] = useState('');
  const [hourlyforecast, setHourlyForecast] = useState('');
  const [dailyforecast, setDailyForecast] = useState("");
  const URL = `https://api.openweathermap.org/data/2.5`;
  const API_KEY = `6946597af76c02b9b10bb33cb99c17df`;
  const iconURL = `http://openweathermap.org/img/wn`;

  useEffect(() => {
	  function success(position) {
		  setLat(position.coords.latitude)
		  setLon(position.coords.longitude)
	  };
	  function error() {
		  alert('unable to retrieve location');
	  };
	  navigator.permissions.query({name:'geolocation'}).then(function(result) {
  if (result.state === 'granted') {
    navigator.geolocation.getCurrentPosition(success, error);
  } else if (result.state === 'prompt') {
    alert('location permission required');
  }
  // Don't do anything if the permission was denied.
});

	  axios.get(`${URL}/onecall?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`).then(weatherData =>  {
		  setTemprature(weatherData.data.current.temp);
		  setHumidity(weatherData.data.current.humidity);
		  setSunrise(weatherData.data.current.sunrise);
		  setSunset(weatherData.data.current.sunset);
		  setFeelsLike(weatherData.data.current.feels_like);
		  setUVI(weatherData.data.current.uvi);
		  setWindSpeed(weatherData.data.current.wind_speed);
		  setIcon(`${iconURL}/${weatherData.data.current.weather[0].icon}.png`);
		  setWeather(weatherData.data.current.weather[0].main);
		  setHourlyForecast(weatherData.data.hourly);
		  setDailyForecast(weatherData.data.daily);
		  console.log(weatherData);
	  }).then(() => {
		  setLoading(false);
	  }).catch(err => {
		  console.log(err);
	  })

  }, [lat, lon]);
	useEffect(() => {
			axios.get(`${URL}/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`).then(result => {
				setCity(result.data.name)
			})
			.catch(err => {
				console.log(err)
			})
	}, [lat,lon])

	useEffect(() => {
		axios.get(`${URL}/weather?q=${searchCity}&units=metric&APPID=${API_KEY}`).then(response => {
			setSearchCity(response.data.name)
			setSearchedTemp(response.data.main.temp)
			console.log(response.data)
		}).catch(err => {
			console.log(err)
		})
	},[searchCity]);

  return isLoading ? (
                <div style={{width:'100%', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>                                              <Loader />                              </div>                                          ) : (
    <div>
	<Header city={city} searchCity={searchCity} setSearchCity={setSearchCity} />
	<Container style={{backgroundColor:'#eee',padding:'20px'}}>
	<Weather
	  temprature={temprature}
	  searchedTemp={searchedTemp}
	  humidity={humidity}
	  sunrise={sunrise}
	  sunset={sunset}
	  feelsLike={feelsLike}
	  UVI={UVI}
	  windSpeed={windSpeed} 
	  icon={icon}
	  weather={weather}
	  hourlyforecast={hourlyforecast}
	  />
	 <DailyForecastDetails 
	 dailyforecast={dailyforecast}/>
	</Container>
    </div>
  );
}
