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
          <p>© 2025 天气应用 | 数据由 OpenWeatherMap 提供</p>
        </footer>
      </div>
    </div>
  );
}

export default App;