import React, { useState, useEffect }  from 'react';
import './Calendar.css';
import DayDetails from './DayDetails';


const Calendar = ( {month, year, averages, weatherDataRangeInYears, location, weatherDataByYear}) => {
  const [selectedDay, setSelectedDay] = useState("");
  const parsedMonth = new Date(`${month.value} 1, ${year}`).getMonth() + 1; 
  const parsedYear = parseInt(year, 10);
  const firstDayOfWeek = new Date(parsedYear, parsedMonth - 1, 1).getDay() || 7;
  const blankSquares = Array.from({ length: firstDayOfWeek }).map((_, index) => (
<div key={`blank-${index}`} className="blank-square"></div>
));
  
  const getDaysArrayForMonth = (year, month) => {
    try{    
      console.log('getting days of the month')
      const fixDateForAllBrowsers = dateString => dateString.replace(/-/g, '/');
      const fixedDateString = fixDateForAllBrowsers(dateString);
      const daysInMonth = new Date(fixedDateString + '-01').getDate();
      const array = Array.from({ length: daysInMonth }, (_, index) => index + 1);
      console.log('Days in month:', daysInMonth); 
      
      return array;
    } catch (error) {
      console.error('error getting days of month:', error)
    }
  };
  
  const daysArray = getDaysArrayForMonth(parsedYear, parsedMonth);


  const renderDaySquare = (day) => {
    try {
      console.log('Rendering day:', day);
      const dayData = averages[day - 1];
      const { averageTemperature, frequencyOfRain } =
        dayData || {};
       const frequencyOfRainAsPercentage = Math.ceil((frequencyOfRain / weatherDataRangeInYears) * 100);

      return (
        <div key={day} className="calendar-grid-square" onClick={() => handleDayClick(day)}>
          <div className="date-underline"><span className="card-header">{day}</span></div>
          {dayData && (
            <div>
              <p>Avg. Temp: {averageTemperature}°C</p>
  
              {frequencyOfRainAsPercentage > 60 ? 
              <span className="card-emoji">☔</span> 
              : frequencyOfRainAsPercentage > 49 ? 
              <span className="card-emoji">☂️</span> 
              : <span className="card-emoji">☀️</span>
            }
              <p>Rained {frequencyOfRain} times in last {weatherDataRangeInYears} years.</p>
  
            </div>
          )}
      </div>
      );
    } catch (error) {
      console.error(`Error in rendering calendar for day ${day}:`, error);
      return (
        <div key={day} className="calendar-grid-square error">
          <div className="date-underline"><span className="card-header">{day}</span></div>
          <p>Error: Unable to render data for this day.</p>
        </div>
      );
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  
  
    const handleDayClick = (day) => {
      openModal();
      setSelectedDay(day.toString().padStart(2, '0'));
    };

    useEffect(() => {
      console.log("Calendar component is mounted.");
    }, []);

    useEffect(() => {
      console.log("Averages have changed. Re-rendering Calendar component.");
    }, [averages]);
  

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
        {isModalOpen && (
          <DayDetails
            day={selectedDay}
            month={month}
            location={location}
            weatherDataRangeInYears={weatherDataRangeInYears}
            weatherDataByYear={weatherDataByYear}
            onCloseModal={() => setModalOpen(false)}
          />
        )}
        {isModalOpen && <div className="overlay" />}

    </div>
    </div>
    );
};

export default Calendar;