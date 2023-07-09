import React, { useState, useEffect }  from 'react';
import './Calendar.css';
import weatherCodes from '../weatherCodes.json';




const Calendar = ( {month, year, averages, weatherDataRangeInYears, location}) => {
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
      <span className="card-header">{day}</span>
      {dayData && (
        <div>
          <p>Average Temperature: {averageTemperature}°C</p>

          {frequencyOfRainAsPercentage > 60 ? 
          <span className="card-emoji">☔</span> 
          : frequencyOfRainAsPercentage > 49 ? 
          <span className="card-emoji">☂️</span> 
          : <span className="card-emoji">☀️</span>
        }
          <p>It rained {frequencyOfRain} times in the last {weatherDataRangeInYears} years.</p>

        </div>
      )}
    </div>
    );
  };



    return (
      <div className="calendar">
        <div className="calendar-header">
        <h1>{month.name}, {year} </h1>
        <h3>in {location}</h3>
        </div>
      <div className="calendar-grid">
        <div className="calendar-grid-days">Sun</div>
        <div className="calendar-grid-days">Mon</div>
        <div className="calendar-grid-days">Tue</div>
        <div className="calendar-grid-days">Wed</div>
        <div className="calendar-grid-days">Thu</div>
        <div className="calendar-grid-days">Fri</div>
        <div className="calendar-grid-days">Sat</div>
        {blankSquares}
        {daysArray.map((day) => renderDaySquare(day))} 
    </div>
    </div>
    );
};

export default Calendar;