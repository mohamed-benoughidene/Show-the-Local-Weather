import React,{useState,useEffect} from 'react'

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('°C'); // Default to Fahrenheit
  const [temp, setTemp] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch weather data when the component mounts
    fetchWeather();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const fetchWeather = () => {
   
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const apiUrl = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`;
        setLoading(true);
        fetch(apiUrl)
          .then(response => response.json())
          .then(data =>{
            setWeatherData(data);
            setLoading(false);
            if(unit === '°F'){
              setTemp(`${Math.floor((data.main.temp * 9/5) + 32)}°F`);
              setUnit('°C');
            }else{
              setUnit('°F');
              setTemp(`${Math.floor(data.main.temp)}°C`);
            }
          } );
      },
      (error) => {
        setLoading(false);
        console.error('Error getting location:', error);
      }
    );
  };

  const toggleUnit = () => {
    setUnit(unit === '°F' ? '°F' : '°C');
    if(unit === '°F'){
      setTemp((temp * 9/5) + 32);
    }
  };
 
  return (
    <div className="weather-app">
      {loading && (
        <p>Loading...</p>
      )}
      {weatherData && (
        <div className="weather-container">
          <h2 className="location">{weatherData.name}, {weatherData.sys.country}</h2>
          <p className="description">{weatherData.weather[0].description}</p>
          <img className="weather-icon" src={weatherData.weather[0].icon} alt="Weather Icon" />
          <p className="temperature">Temperature: {temp}</p>
          <button className="toggle-button" onClick={() => fetchWeather()}>Toggle Unit</button>
         
        </div>
      )}
      {!loading && (
          <a className='source-code' href="https://github.com/mohamed-benoughidene/Show-the-Local-Weather" target='_blank'>Source Code</a>
      )}
     
    </div>
  );
}