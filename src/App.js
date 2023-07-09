import React, { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import WeatherForm from './components/WeatherForm';
import WeatherData from './components/WeatherData';
import './App.css';

function App() {
  const [selectedMonth, setSelectedMonth] = useState({ value: '00', name: '' });
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedLatitude, setSelectedLatitude] = useState(null);
  const [selectedLongitude, setSelectedLongitude] = useState(null);
  const [averagesForSelectedMonth, setAveragesForSelectedMonth] = useState({});

  const weatherDataRangeInYears = 10


  const handleFormSubmit = (month, year, latitude, longitude, location) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    setSelectedLatitude(latitude);
    setSelectedLongitude(longitude);
    setSelectedLocation(location)
    };


  const updateAverages = (averages) =>{
    setAveragesForSelectedMonth(averages)
  }


  useEffect(() => {
    setAveragesForSelectedMonth({});
  }, [selectedMonth, selectedLocation, selectedYear]);


  return (
    <div className="App">

      
      <div className="form-wrapper">
        <h1>Weather Predictor</h1>
        <p>Predict the weather based on the last {weatherDataRangeInYears} years of weather data</p>
        <WeatherForm onFormSubmit={handleFormSubmit} />
      </div>
     

        <WeatherData    
        month={selectedMonth}
        latitude={selectedLatitude}
        longitude={selectedLongitude} 
        onDataFetch={updateAverages}
        year={selectedYear}
        weatherDataRangeInYears = {weatherDataRangeInYears}
        />

        {selectedMonth && selectedLocation && selectedYear 
        && (
          <div className="calendar-wrapper">
            <Calendar 
            month={selectedMonth}
            year={selectedYear}
            averages={averagesForSelectedMonth}
            weatherDataRangeInYears ={weatherDataRangeInYears}
            />
          </div>
        )
        }
        
    </div>
  );
}

export default App;
