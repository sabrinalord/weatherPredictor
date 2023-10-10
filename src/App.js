import React, { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import WeatherForm from './components/WeatherForm';
import WeatherData from './components/WeatherData';
import './App.css';

function App() {
  const [selectedMonth, setSelectedMonth] = useState({ value: '00', name: '' });
  const [selectedLocation, setSelectedLocation] = useState({});
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedLatitude, setSelectedLatitude] = useState(null);
  const [selectedLongitude, setSelectedLongitude] = useState(null);
  const [averagesForSelectedMonth, setAveragesForSelectedMonth] = useState({});
  const [weatherDataByYear, setweatherDataByYear]  = useState({});

  const weatherDataRangeInYears = 10


  const handleFormSubmit = (month, year, latitude, longitude, location) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    setSelectedLatitude(latitude);
    setSelectedLongitude(longitude);
    setSelectedLocation(location)
    };


  const updateData= (averages, sortedData) =>{
    try {      
      setAveragesForSelectedMonth(averages);
      setweatherDataByYear(sortedData);
      console.log('weather data updated successfully.');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }


  useEffect(() => {
    setAveragesForSelectedMonth({});
  }, [selectedMonth, selectedLocation, selectedYear]);


  return (
    <div className="App">


      <div className="site-header">
      <h1>Weather Predictor</h1>
      <h4>Predict the weather based on the last {weatherDataRangeInYears} years of weather data</h4>
      <p>This site will spin down due to in-activity. If you don't see results below, please wait 30seconds and try again. </p>

        <WeatherForm onFormSubmit={handleFormSubmit} />
      </div>
     

        <WeatherData    
        month={selectedMonth}
        latitude={selectedLatitude}
        longitude={selectedLongitude} 
        onDataFetch={updateData}
        year={selectedYear}
        weatherDataRangeInYears={weatherDataRangeInYears}
        />

        {selectedMonth && selectedLocation && selectedYear 
        && (
          <div className="calendar-wrapper">
            <Calendar 
            month={selectedMonth}
            year={selectedYear}
            averages={averagesForSelectedMonth}
            weatherDataRangeInYears={weatherDataRangeInYears}
            location={selectedLocation}
            weatherDataByYear={weatherDataByYear}
            />
          </div>
        )
        }
        
    </div>
  );
}

export default App;
