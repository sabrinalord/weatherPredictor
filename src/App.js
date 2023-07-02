import React, { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import WeatherForm from './components/WeatherForm';
import WeatherData from './components/WeatherData';
import './App.css';

function App() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedLatitude, setSelectedLatitude] = useState(null);
  const [selectedLongitude, setSelectedLongitude] = useState(null);
  const [averagesForSelectedMonth, setAveragesForSelectedMonth] = useState({});


  const handleFormSubmit = (month, year, latitude, longitude, location) => {
    console.log('Submitted form values:', month, year, latitude, longitude);
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

       <h1>Weather Predictor</h1>

       <p>Predict the weather based on the last 10 years of weather data</p>

        <WeatherForm onFormSubmit={handleFormSubmit} />
        {selectedMonth && selectedLocation && selectedYear 
        && (

          <div>
        <WeatherData    
        month={selectedMonth}
        latitude={selectedLatitude}
        longitude={selectedLongitude} 
        onDataFetch={updateAverages}
        year={selectedYear}
        />

        <Calendar 
        month={selectedMonth}
        year={selectedYear}
        averages={averagesForSelectedMonth}
        />
        </div>
        )
        
        }

        
    </div>
  );
}

export default App;
