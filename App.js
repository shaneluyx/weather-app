import React from 'react';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>天气预报</h1>
        </header>
        
        <main>
          <WeatherDisplay />
        </main>
        
        <footer>
          <p>© 2025 Haverweather | Data From OpenWeatherMap </p>
        </footer>
      </div>
    </div>
  );
}

export default App;