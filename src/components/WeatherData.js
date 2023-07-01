import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherData = ({month, latitude, longitude, onDataFetch}) => {
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState({});
    const [averages, setAverages] = useState("")


    const currentDate = new Date();
            const dateNumber = currentDate.getDate();
            const formattedDateNumber = String(dateNumber).padStart(2, '0');
            const currentYear = currentDate.getFullYear();
            const startYear = currentYear - 5
            ;
        
    useEffect(() => {
        const fetchWeatherData = async () => {
          console.log('fetching weatherData')
          try {
            const startDate = `${startYear}-${month}-01`;
            const endDate = `${currentYear}-${month}-${formattedDateNumber}`;
            const endpoint = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=weathercode,temperature_2m_mean,rain_sum&timezone=Europe%2FLondon`;
            console.log(endpoint)
            const response = await axios.get(endpoint);
            setWeatherData(response.data.daily);
            setError(null);
            console.log(`this is weatherData ${Object.entries(weatherData)}`)

          } catch (error) {
            setError('Failed to fetch weather data');
            console.error(error);
          }
        };

       fetchWeatherData();
      }, [month, latitude, longitude]);


      const filterDataByMonth = (month, weatherData) => {
        return  weatherData.map(([category, values]) => {
          if (category === "time") {
            const filteredDates = values.filter(date => date.substring(5, 7) === month);
            return [category, filteredDates];
          }
          return [category, values];
        });
      }

      const reorganiseWeatherData = (weatherData, month) => {
        const { time, weathercode, temperature_2m_mean, rain_sum } = weatherData;
        const sortedData = time.reduce((result, date, i) => {
          const dataMonth = date.substring(5, 7);
      
          if (dataMonth === month) {
            const day = date.substring(8, 10);
            let obj = result.find(obj => obj.date === day);
      
            if (!obj) {
              obj = {
                date: day,
                weathercode: [],
                temperature_2m_mean: [],
                rain_sum: []
              };
              result.push(obj);
            }
      
            obj.weathercode.push(weathercode[i]);
            obj.temperature_2m_mean.push(temperature_2m_mean[i]);
            obj.rain_sum.push(rain_sum[i]);
          }
      
          return result;
        }, []);
      
        return sortedData;
      };


      function findMode(arr) {
        var count = {};
        var maxCount = 0;
        var mode;
      
        for (var i = 0; i < arr.length; i++) {
          var num = arr[i];
          if (count[num]) {
            count[num]++;
          } else {
            count[num] = 1;
          }
      
          if (count[num] > maxCount) {
            maxCount = count[num];
            mode = num;
          }
        }
      
        return mode;
      }

    
const calculateAverages = (sortedData) => {
  const averageTemperaturesPerDay = sortedData.map((item) => {
    const meanTemp = item.temperature_2m_mean.reduce(
      (sum, temp) => sum + temp,
      0
    ) / item.temperature_2m_mean.length;

    const meanRain = item.rain_sum.reduce(
      (sum, temp) => sum + temp,
      0
    ) / item.rain_sum.length;

    const mostFrequentWeatherCode = findMode(item.weathercode)

    return {
      date: item.date,
      averageTemperature: meanTemp,
      averageRainSum: meanRain,
      modeWeathercode: mostFrequentWeatherCode
    };
  });

  return averageTemperaturesPerDay
}
      
  

      useEffect(() => {
        if(Object.keys(weatherData).length > 0) {
          const sortedData = reorganiseWeatherData(weatherData, month)
          const calculatedAverages = calculateAverages(sortedData)
         setAverages(calculatedAverages)
         console.log(`averageTemperatures: ${JSON.stringify(averages)}`) 
         onDataFetch(averages)

        }
      }, [month, weatherData]);

 
      
      return null
    };


    
        
    export default WeatherData;