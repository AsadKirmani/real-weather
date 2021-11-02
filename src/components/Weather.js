import React from 'react';
import { Card, CardContent, Typography, Avatar, List, ListItem, ListItemText, ListItemAvatar, Divider } from '@mui/material';
import moment from 'moment';
import humidityIcon from '../assets/humidity_icon.svg';
import uv from '../assets/uv.png';
import sunriseIcon from '../assets/sunrise.png';
import sea from '../assets/sea.png';
import wind from '../assets/wind.png';
import humidityicon from '../assets/humidity.png';

const Weather = ({ temprature, humidity, sunrise, sunset, feelsLike, UVI, windSpeed, icon, weather, hourlyforecast, forecastIcon, searchedTemp }) => {


const iconURL = `http://openweathermap.org/img/wn`

	return (
		
    <div style={{marginBottom: 10 }} className="weather">
          <Card style={{borderRadius:'20px', marginBottom: 10}}>
		<CardContent>
		<Typography variant="caption" gutterBottom color="#757575">
		{moment().format('ddd, D MMMM h:mm a')}
		</Typography>
		<div style={{display:'flex', justifyContent: 'space-between'}}>
		<div style={{display:'flex'}}>
		<Avatar
		alt="weather_icon"
		src={icon} 
		sx={{width:64, height:64}}/>
		<Typography variant="h3">
		{Math.floor(searchedTemp ? searchedTemp : temprature )}°
		</Typography>
		</div>
		<div>
		<Typography variant="body2" color="#757575">
		{weather}
		</Typography>
		<Typography variant="caption" color="#757575">
		Feels like {Math.floor(feelsLike)}°
		</Typography>
		</div>
		</div>
		<div style={{overflow: 'auto', display:'flex', whiteSpace:'nowrap', overflowX: 'scroll' }}>
		{hourlyforecast.filter((data,index) =>  index !==0 && index < 25 ).map((data) => {
			return (
				<div key={data.dt}>
				<Typography style={{marginRight: '20px'}} gutterBottom variant="body2" color="#757575">
				{new Date(data.dt * 1000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }
				</Typography>
				<div>
				<Avatar
				alt="forecast_icon"
				src={`${iconURL}/${data.weather[0].icon}.png`}
				sx={{height: 48, width: 48}} />
				<Typography style={{marginRight: '20px', paddingLeft:15}} variant="subtitle1">
				{Math.floor(data.temp)}°
				</Typography>
				<div>
				<img src={humidityIcon} style={{ paddingLeft: '15px'}} alt="humidity_icon"></img>
				<Typography variant="caption" sx={{fontSize:'11px'}} color="#757575" >{data.humidity}%</Typography>
				</div>
				</div>
				</div>
			)})}
		</div>
		</CardContent>
		</Card>
			<Card style={{borderRadius:'20px'}}>
		<CardContent>
		<List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={uv} sx={{width:24, height:24}}/>
                  </ListItemAvatar>
                  <ListItemText
                    primary="UV index"
		    color="#757575"
                  />
		<Typography>{UVI<3 ? 'Low' : 'Moderate'}</Typography>
                </ListItem>
		<Divider variant="inset" />
		<ListItem>
                  <ListItemAvatar>                                  <Avatar src={sunriseIcon} sx={{width:24, height:24}} />
		</ListItemAvatar>
                  <ListItemText
                    primary="Sunrise"
		/>
	<Typography>{ new Date(sunrise * 1000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }</Typography>
		</ListItem>
		<Divider variant="inset" />
		<ListItem>
                  <ListItemAvatar>
		<Avatar src={sea} sx={{width:24, height:24}}/>
		</ListItemAvatar>
		<ListItemText
		primary="Sunset"
		/>
		<Typography>{ new Date(sunset * 1000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }</Typography>
		</ListItem>
		<Divider variant="inset" />
		<ListItem>
                  <ListItemAvatar>
		<Avatar src={wind} sx={{width:24, height:24}}/>
		</ListItemAvatar>
		<ListItemText
		primary="Wind"
		/>                                            <Typography>{Math.floor(windSpeed)}km/h</Typography>
		</ListItem>
		<Divider variant="inset" />
		<ListItem>
                  <ListItemAvatar>
		<Avatar src={humidityicon} sx={{width:24, height:24}}/>
		</ListItemAvatar>
		<ListItemText
		primary="Humidity"
		/>                                            <Typography>{humidity}%</Typography>
		</ListItem>
            </List>
		</CardContent>
		</Card>
    </div>
	)

}

export default Weather;
