import React,{useState,useEffect} from 'react'

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('imperial'); // Default to Fahrenheit

  useEffect(() => {
    // Fetch weather data when the component mounts
    fetchWeather();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const fetchWeather = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const apiUrl = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}&units=${unit}`;
        
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => setWeatherData(data));
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };
console.log(weatherData);
  const toggleUnit = () => {
    setUnit(unit === 'imperial' ? 'metric' : 'imperial');
    fetchWeather(); // Fetch weather data with the new unit
  };

  return (
    <div className="weather-app">
      {weatherData && (
        <div className="weather-container">
          <h2 className="location">{weatherData.name}, {weatherData.sys.country}</h2>
          <p className="description">{weatherData.weather[0].description}</p>
          <img className="weather-icon" src={weatherData.weather[0].icon} alt="Weather Icon" />
          <p className="temperature">Temperature: {weatherData.main.temp} {unit === 'imperial' ? '°F' : '°C'}</p>
          <button className="toggle-button" onClick={toggleUnit}>Toggle Unit</button>
        </div>
      )}
       <a className='source-code' href="https://github.com/mohamed-benoughidene/Show-the-Local-Weather" target='_blank'>Source Code</a>
    </div>
  );
}