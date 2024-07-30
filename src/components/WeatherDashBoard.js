import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CardMedia, TextField, Button, Box, styled } from '@mui/material';
import { API_KEY } from '../constant';
import summerImg from '../assets/download.jpeg';
import Monsoon from '../assets/monsoon-farming-13809570.webp';
import Event from '../assets/premium_photo-1663013123196-f83decee810f.jpeg';
import Travel from '../assets/66691948cf6a2-travelling-12430430-16x9.avif';

const CustomCardMedia = styled(CardMedia)({
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
});

const SmallTextField = styled(TextField)({
  width: '200px',
  '& .MuiInputBase-root': {
    height: '40px',
  },
});

const SmallButton = styled(Button)({
  height: '40px',
  padding: '0 16px',
});

function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState('New Delhi'); 

  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  const fetchForecast = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric`
      );
      setForecastData(response.data.daily);
    } catch (error) {
      console.error('Error fetching forecast data', error);
    }
  };

  useEffect(() => {
    fetchWeather(location); 
  }, []);

  useEffect(() => {
    if (weatherData && weatherData.coord) {
      fetchForecast(weatherData.coord.lat, weatherData.coord.lon);
    }
  }, [weatherData]);

  const handleSearch = () => {
    fetchWeather(location); 
  };

  if (!weatherData) return <Typography>Loading...</Typography>;

  const { main, weather } = weatherData;

  const isSuitableForEvent = main.temp >= 15 && main.temp <= 25 && !weather[0].description.includes('rain');
  const isSuitableForFarmers = main.temp >= 10 && main.temp <= 30 && weather[0].description.includes('rain');
  const isSuitableForTravelers = main.temp >= 10 && main.temp <= 30 && !weather[0].description.includes('storm');

  const getNextSuitableDay = (checkFunction) => {
    if (!forecastData) return 'No suitable day found in the next week';
    
    for (const day of forecastData) {
      const isSuitable = checkFunction(day);
      if (isSuitable) {
        const date = new Date(day.dt * 1000);
        return `${date.toDateString()}`;
      }
    }
    return 'No suitable day found in the next week';
  };

  const nextSuitableEventDay = getNextSuitableDay((day) =>
    day.temp.day >= 15 && day.temp.day <= 25 && !day.weather[0].description.includes('rain')
  );
  const nextSuitableFarmersDay = getNextSuitableDay((day) =>
    day.temp.day >= 10 && day.temp.day <= 30 && day.weather[0].description.includes('rain')
  );
  const nextSuitableTravelersDay = getNextSuitableDay((day) =>
    day.temp.day >= 10 && day.temp.day <= 30 && !day.weather[0].description.includes('storm')
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <SmallTextField
          label="Search Location"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <SmallButton variant="contained" color="primary" onClick={handleSearch}>
          Search
        </SmallButton>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CustomCardMedia
              component="img"
              height="140"
              image={Event}
              alt="Event Planner"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Event Planners
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Temperature: ${main.temp}°C`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Condition: ${weather[0].description}`}
              </Typography>
              <Typography variant="body2" color={isSuitableForEvent ? 'green' : 'red'}>
                {isSuitableForEvent ? '😊 Suitable for Events' : `😞 Not Suitable. Next good day: ${nextSuitableEventDay}`}           
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CustomCardMedia
              component="img"
              height="140"
              image={Travel}
              alt="Traveler"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Travelers
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Temperature: ${main.temp}°C`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Condition: ${weather[0].description}`}
              </Typography>
              <Typography variant="body2" color={isSuitableForTravelers ? 'green' : 'red'}>
                {isSuitableForTravelers ? '😊 Good for Travel' : `Not Ideal. Next good day: ${nextSuitableTravelersDay}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CustomCardMedia
              component="img"
              height="140"
              image={Monsoon}
              alt="Farmer"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Farmers
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Temperature: ${main.temp}°C`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Condition: ${weather[0].description}`}
              </Typography>
              <Typography variant="body2" color={isSuitableForFarmers ? 'green' : 'red'}>
                {isSuitableForFarmers ? '😊 Good for Farming' : `Not Ideal. Next good day: ${nextSuitableFarmersDay}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default WeatherDashboard;
