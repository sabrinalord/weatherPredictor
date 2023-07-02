import React, { useState, useEffect }  from 'react';
import './Calendar.css';




const Calendar = ( {month, year, averages}) => {

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const parsedMonth = new Date(`${month} 1, ${year}`).getMonth() + 1; 
  const parsedYear = parseInt(year, 10); 
  const daysInMonth = getDaysInMonth(parsedYear, parsedMonth);
  const firstDayOfWeek = new Date(parsedYear, parsedMonth - 1, 1).getDay() || 7;
  const blankSquares = Array.from({ length: firstDayOfWeek }, (_, index) => (
    <div 
    key={`blank-${index}`} 
    className="calendar-grid-square blank-square">
    </div>
  ));

  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const renderDaySquare = (day) => {
    const dayData = averages[day];
    const { averageTemperature, averageRainSum, modeWeathercode } =
      dayData || {};
    return (
      <div key={day} className="calendar-grid-square">
      {day}

      {dayData && (
        <div>
          <p>Average Temperature: {averageTemperature}°C</p>
          <p>Average Rain Sum: {averageRainSum}</p>
          <p>Mode Weather Code: {modeWeathercode}</p>
        </div>
      )}
    </div>
    );
  };



    return (
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
    );
};

export default Calendar;