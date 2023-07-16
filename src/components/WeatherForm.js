import React, { useState } from 'react';
import './WeatherForm.css';
import axios from 'axios';


const WeatherForm = ({ onFormSubmit }) => {
    const [month, setMonth] = useState({ value: '00', name: '' });
    const [location, setLocation] = useState('');
    const [year, setYear] = useState('');
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()


    const handleSubmit = async (event) => {
      event.preventDefault();
      const {latitude , longitude} =  await getLocationCoordinates(location);
      setLatitude(latitude);
      setLongitude(longitude);
      if (latitude && longitude) {
        onFormSubmit(month, year, latitude, longitude, location);
      }
    };


    const getLocationCoordinates = async (inputLocation) => {
      try {
        const url = `http://localhost:8000/coordinates?location=${encodeURIComponent(inputLocation)}`;
        const response = await axios.get(url);
        const { latitude , longitude } = response.data;

        return { latitude , longitude };
      } catch (error) {
        console.error(error);
      }
    };

      const handleChangeMonth = (event) => {
        const selectedMonthNumber = event.target.value;
        const selectedMonthOption = months.find(
          (option) => option.value == selectedMonthNumber);
        if (selectedMonthOption) {
          setMonth(selectedMonthOption);
        } else {
          setMonth('');
        }
      };

    const months = [
        { value: '00', name: '' },
        { value: '01', name: 'January' },
        { value: '02', name: 'February' },
        { value: '03', name: 'March' },
        { value: '04', name: 'April' },
        { value: '05', name: 'May' },
        { value: '06', name: 'June' },
        { value: '07', name: 'July' },
        { value: '08', name: 'August' },
        { value: '09', name: 'September' },
        { value: '10', name: 'October' },
        { value: '11', name: 'November' },
        { value: '12', name: 'December' }
      ];
    

    return (

<form className="form-container" onSubmit={handleSubmit}>



<div className="form-row">

  <label for='month'>Select Month:</label>
              <select  name='month' value={month.value} onChange={handleChangeMonth}>
                {months.map((option) => (
                <option 
                  key={option.value} 
                  value={option.value}>
                  {option.name}
                </option>
                ))}
              </select>
          </div>


          <div className="form-row">
          <label for='year'>Year:</label>
              <input className="form-input" name='year' type="text" value={year} onChange={(e) => setYear(e.target.value)} />
          </div>

          <div className="form-row">
          <label for='location'>Location:</label>
              <input className="form-input" name='location' type="text" placeholder="Town, postcode, city" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>


          <div className="button-container">
          <button className="form-button" type="submit">Submit</button>      
            </div> 

</form>

     
    );
};

export default WeatherForm;