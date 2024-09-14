import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NEW_API_KEY } from '../constant';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
  
      // Fetch current weather data
      const currentWeatherResponse = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${NEW_API_KEY}&q=${cityName}&aqi=no`
      );
      setWeather(currentWeatherResponse.data);
  
      // Fetch 5-day forecast data
      const forecastResponse = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${NEW_API_KEY}&q=${cityName}&days=5`
      );
      console.log(forecastResponse.data.forecast.forecastday,'forecastResponse.data.forecast.forecastday')
      setForecast(forecastResponse.data.forecast.forecastday);
  
      setLoading(false);
      setCity(cityName);
      localStorage.setItem('lastCity', cityName);
    } catch (error) {
      setLoading(false);
      setError('City not found, please try again');
    }
  };

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      fetchWeather(lastCity);
    }
  }, [unit]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const toggleUnit = (newUnit) => {
    if (newUnit !== null) {
      setUnit(newUnit);
    }
  };

  const handleGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      axios
        .get(
          `http://api.weatherapi.com/v1/current.json?key=${NEW_API_KEY}&q=${latitude},${longitude}&aqi=no`
        )
        .then((response) => {
          setWeather(response.data);
          setCity(response.data.location.name);
        })
        .catch(() => {
          setError('Failed to fetch weather for your location');
        });
    });
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Sunny':
        return '☀️';
      case 'Cloudy':
      case 'Partly cloudy':
        return '☁️';
      case 'Rain':
        return '🌧️';
      case 'Snow':
        return '❄️';
      default:
        return '🌍';
    }
  };

  return (
    <div className="weather-dashboard">
      <form onSubmit={handleSearch} className="form-row">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleGeolocation}>
          Use My Location
        </button>
        <div className="toggle-group">
          <button
            className={`toggle-button ${unit === 'metric' ? 'active' : ''}`}
            onClick={() => toggleUnit('metric')}
          >
            Celsius
          </button>
          <button
            className={`toggle-button ${unit === 'imperial' ? 'active' : ''}`}
            onClick={() => toggleUnit('imperial')}
          >
            Fahrenheit
          </button>
        </div>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : weather ? (
        <div>
          <h3>Current Weather in {weather.location.name}</h3>
          <p>
            {getWeatherIcon(weather.current.condition.text)}{' '}
            {unit === 'metric' ? weather.current.temp_c : weather.current.temp_f}°
            {unit === 'metric' ? 'C' : 'F'}
          </p>
          <p>Weather: {weather.current.condition.text}</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind Speed: {weather.current.wind_kph} km/h</p>

          <h3>5-Day Forecast</h3>
          <div className="forecast-container">
            {forecast &&
              forecast.map((day, index) => (
                <div className="forecast-card" key={index}>
                  <h4>{new Date(day.date).toLocaleDateString()}</h4>
                  <img src={day.day.condition.icon} alt={day.day.condition.text} />
                  <p>
                    Temp: {unit === 'metric' ? day.day.avgtemp_c : day.day.avgtemp_f}°
                    {unit === 'metric' ? 'C' : 'F'}
                  </p>
                  <p>{day.day.condition.text}</p>
                  <p>
                    Min: {unit === 'metric' ? day.day.mintemp_c : day.day.mintemp_f}°
                    {unit === 'metric' ? 'C' : 'F'}
                  </p>
                  <p>
                    Max: {unit === 'metric' ? day.day.maxtemp_c : day.day.maxtemp_f}°
                    {unit === 'metric' ? 'C' : 'F'}
                  </p>
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherDashboard;
