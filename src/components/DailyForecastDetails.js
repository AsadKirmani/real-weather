import React from 'react';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
import humidityIcon from '../assets/humidity_icon.svg';

const DailyForecastDetails = ({dailyforecast}) => {
	const iconURL = `http://openweathermap.org/img/wn`
	return(
		<Box style={{ marginBottom: 10 }}>
		<Card style={{borderRadius:20}}>
		<CardContent>
		{dailyforecast.map((data) => {

		return (
			<div style={{display:'flex', justifyContent:'space-between', alignItems: 'center' }} key={data.dt}>
			<div style={{margin:0}}>
			<Typography gutterBottom>
			{new Date(data.dt * 1000).toLocaleString('en-IN', {weekday: 'long'})}
			</Typography>
			</div>
			<div style={{display:'flex', position: 'absolute', marginLeft:'8em'}}>
			<img src={humidityIcon}
			alt="humidity_icon"/>
			<Typography variant="caption">
			{data.humidity}%
			</Typography>
			<Avatar alt="forecast_icon" src={`${iconURL}/${data.weather[0].icon}.png`} sx={{height:24, width:24}}></Avatar>
			</div>
			<Typography gutterBottom>
			{Math.floor(data.temp.min)}°/ {Math.floor(data.temp.max)}°
			</Typography>
			</div>
		)})}
		</CardContent>
		</Card>
		</Box>
	)
}

export default DailyForecastDetails;
