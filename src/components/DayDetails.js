import React, { useState, useEffect }  from 'react';
import weatherCodes from '../weatherCodes.json';
import './DayDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';





const DayDetails = ({ weatherDataRangeInYears, weatherDataByYear, onCloseModal, day, month, location }) => {
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
            <div className="details-row" key={index}>
              <p className="details-date">{yearData.year}</p>
              <p className="weather-icon">{weatherCodes[yearData.value].image}</p> 
              
              <p>    
                <p>{weatherCodes[yearData.value].description}</p> 
                    {selectedData.rain_sum[index].value !== 0 && (
                    <>
                        <p>It rained {selectedData.rain_sum[index].value}mm, for {selectedData.precipitation_hours[index].value} hours</p>
                    </>
                    )}
              </p>
              <p>Max Temp: <br></br>
                <span className="temperature">
                {selectedData.temperature_2m_max[index].value}°C
                </span>
                
              </p>

          
            </div>
          ))}
        </div>
      );
    };

    function getDaySuffix(day) {
        if (day >= 11 && day <= 13) {
          return 'th';
        }
      
        switch (day % 10) {
          case 1:
            return 'st';
          case 2:
            return 'nd';
          case 3:
            return 'rd';
          default:
            return 'th';
        }
      }
    
      const formattedDay = day.toString().replace(/^0+/, '');
    const dayDetailsContent = renderDaySquare(day, month, weatherDataByYear);
  
    return (
      <div className="day-details">
        <div className="day-details-header">
             <h1>{formattedDay}{getDaySuffix(day)}, {month.name || month} in {location}</h1>
            <p className="close-btn" onClick={onCloseModal} style={{ color: 'white' }}>
                <FontAwesomeIcon icon={faTimes} />
            </p>
        </div>
        <div>
        {dayDetailsContent}
        </div>
      
      </div>
    );
  };
  
  export default DayDetails;
  