import React, { useState, useEffect }  from 'react';
import weatherCodes from '../weatherCodes.json';

const DayDetails = ({ weatherDataRangeInYears, weatherDataByYear, onCloseModal, day, month }) => {
    console.log(`here is weatherDataByYear in DayDetails: ${JSON.stringify(weatherDataByYear)}`);
  
    const renderDaySquare = (selectedDay, selectedMonth, weatherDataByYear) => {
      const selectedData = weatherDataByYear.find(
        (data) => data.date === selectedDay && data.month === selectedMonth.value
      );
  
      if (!selectedData) {
        console.error("no selected Data")
        return null; 
      }
  
      return (
        <div>
          {selectedData.weathercode.map((yearData, index) => (
            <div key={index}>
              <h3>{yearData.year}</h3>
              <p>Temperature: {selectedData.temperature_2m_max[index].value}</p>
              {selectedData.rain_sum[index].value == "0" ? (
                <p>It did not rain</p>
              ) :  (
                <div>
                <p>It rained {selectedData.rain_sum[index].value}mm, for {selectedData.precipitation_hours[index].value} hours</p>
                </div>
              )}
              <p>{weatherCodes[yearData.value].description}</p> 
              <p>{weatherCodes[yearData.value].image}</p> 
            </div>
          ))}
        </div>
      );
    };
    
  
    const dayDetailsContent = renderDaySquare(day, month, weatherDataByYear);
  
    return (
      <div className="day-details">
        <h2>{day}, {month.name || month}</h2>
        {dayDetailsContent}
        <button onClick={onCloseModal}>Close</button>
      </div>
    );
  };
  
  export default DayDetails;
  