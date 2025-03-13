import React, { useEffect, useState } from 'react';
import './WeatherDisplay.css';
import { getCurrentWeather } from '../services/weatherService';

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Default City
  const defaultCity = "Philadelphia";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await getCurrentWeather(defaultCity);
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    
    // Update Data
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // K to C
  const convertKelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  // Logo
  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Data and time
  const getDateTime = () => {
    const now = new Date();
    return now.toLocaleDateString('zh-CN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="weather-message">Loading...</div>;
  }

  if (error) {
    return <div className="weather-message error">{error}</div>;
  }

  if (!weatherData) {
    return <div className="weather-message">No Weather Data</div>;
  }

  const { name, main, weather, wind, sys } = weatherData;

  return (
    <div className="weather-container">
      <div className="weather-header">
        <h2>{name}, {sys.country}</h2>
        <p className="datetime">{getDateTime()}</p>
      </div>
      
      <div className="weather-content">
        <div className="weather-icon-temp">
          <img 
            src={getWeatherIcon(weather[0].icon)} 
            alt={weather[0].description} 
            className="weather-icon"
          />
          <div className="temperature">
            <span className="temp-value">{convertKelvinToCelsius(main.temp)}°C</span>
            <span className="weather-description">{weather[0].description}</span>
          </div>
        </div>
        
        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">体感温度:</span>
            <span className="detail-value">{convertKelvinToCelsius(main.feels_like)}°C</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">湿度:</span>
            <span className="detail-value">{main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">风速:</span>
            <span className="detail-value">{wind.speed} m/s</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">最高温度:</span>
            <span className="detail-value">{convertKelvinToCelsius(main.temp_max)}°C</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">最低温度:</span>
            <span className="detail-value">{convertKelvinToCelsius(main.temp_min)}°C</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">气压:</span>
            <span className="detail-value">{main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;