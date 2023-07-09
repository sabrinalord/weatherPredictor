import React, { useState, useEffect }  from 'react';
import './Calendar.css';
import weatherCodes from '../weatherCodes.json';




const Calendar = ( {month, year, averages, weatherDataRangeInYears}) => {
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const parsedMonth = new Date(`${month.value} 1, ${year}`).getMonth() + 1; 
  const parsedYear = parseInt(year, 10); 
  const daysInMonth = getDaysInMonth(parsedYear, parsedMonth);
  const firstDayOfWeek = new Date(parsedYear, parsedMonth - 1, 1).getDay() || 7;
  const blankSquares = Array.from({ length: firstDayOfWeek }, (_, index) => (
    <div 
    key={`blank-${index}`} 
    className="calendar-grid-square blank-square">
    </div>
  ));

  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1 );

  const renderDaySquare = (day) => {
    const dayData = averages[day - 1];
    const { averageTemperature, averageRainSum, averagePrecipitationHours, modeWeathercode, frequencyOfWeathercode, frequencyOfRain } =
      dayData || {};

     const frequencyOfWeatherCodeAsPercentage = Math.ceil((frequencyOfWeathercode / weatherDataRangeInYears) * 100);
     const frequencyOfRainAsPercentage = Math.ceil((frequencyOfRain / weatherDataRangeInYears) * 100);

     const weatherDescription = weatherCodes[modeWeathercode]
  
    return (
      <div key={day} className="calendar-grid-square">
      <div className="card-header">{day}</div> 
      {dayData && (
        <div>
          <p>Average Temperature: {averageTemperature}°C</p>

          {frequencyOfRainAsPercentage > 60 ? 
          <span className="card-emoji">🌧‍</span> 
          : frequencyOfRainAsPercentage > 49 ? 
          <span className="card-emoji">😬</span> 
          : <span className="card-emoji">👍</span>
        }
          <p>It rained {frequencyOfRain} times in the last {weatherDataRangeInYears} years.</p>

        { 
        frequencyOfWeatherCodeAsPercentage > 49 ?
        <div className="weather-details">
          <span>{weatherDescription.description} {frequencyOfWeatherCodeAsPercentage}% of the time</span> 
          <span className="small-emoji">{weatherDescription.image}</span>

         </div>
         :
         <div className="weather-details">
         <span>Mixed weather conditions </span>
         <span className="small-emoji">🤷🏻‍♀️</span>
         </div>
          }

        </div>
      )}
    </div>
    );
  };



    return (
      <div>
      <h3>{month.name}</h3>
      <div className="calendar-grid">
        <div className="calendar-grid-header">Sun</div>
        <div className="calendar-grid-header">Mon</div>
        <div className="calendar-grid-header">Tue</div>
        <div className="calendar-grid-header">Wed</div>
        <div className="calendar-grid-header">Thu</div>
        <div className="calendar-grid-header">Fri</div>
        <div className="calendar-grid-header">Sat</div>

        {blankSquares}
        {daysArray.map((day) => renderDaySquare(day))} 
    </div>
    </div>
    );
};

export default Calendar;