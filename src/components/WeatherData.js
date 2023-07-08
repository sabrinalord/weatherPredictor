import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherData = ({month, latitude, longitude, onDataFetch, weatherDataRangeInYears}) => {
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState({});
    const [averages, setAverages] = useState("");

    const getCurrentDate = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const date = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${date}`;
      return formattedDate;
    };
    const startYear = new Date().getFullYear() - weatherDataRangeInYears
        
    useEffect(() => {
        const fetchWeatherData = async () => {
          console.log('fetching weatherData')
          try {
            const startDate = `${startYear}-${month}-01`;
            const endDate = getCurrentDate();
            const endpoint = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=weathercode,temperature_2m_max,rain_sum&timezone=Europe%2FLondon`;
            console.log(endpoint)
            const response = await axios.get(endpoint);
            setWeatherData(response.data.daily);
            setError(null);
          } catch (error) {
            setError('Failed to fetch weather data');
            console.error(error);
          }
        };

       fetchWeatherData();
      }, [month, latitude, longitude]);


      const reorganiseWeatherData = (weatherData, month) => {
        const { time, weathercode, temperature_2m_max, rain_sum } = weatherData;
        const sortedData = time.reduce((result, date, i) => {
          const dataMonth = date.substring(5, 7);
      
          if (dataMonth === month) {
            const day = date.substring(8, 10);
            let obj = result.find(obj => obj.date === day);
      
            if (!obj) {
              obj = {
                date: day,
                weathercode: [],
                temperature_2m_max: [],
                rain_sum: []
              };
              result.push(obj);
            }
      
            obj.weathercode.push(weathercode[i]);
            obj.temperature_2m_max.push(temperature_2m_max[i]);
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

      function countFrequency(arr, target) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === target) {
            count++;
          }
        }
        return count;
      }

    
const calculateAverages = (sortedData) => {
  const averageTemperaturesPerDay = sortedData.map((item) => {
    const meanTemp = item.temperature_2m_max.reduce(
      (sum, temp) => sum + temp,
      0
    ) / item.temperature_2m_max.length;

    const meanRain = item.rain_sum.reduce(
      (sum, temp) => sum + temp,
      0
    ) / item.rain_sum.length;

    const mostFrequentWeatherCode = findMode(item.weathercode)
    const frequencyOfWeathercode = countFrequency(item.weathercode, mostFrequentWeatherCode)
   
    return {
      date: item.date,
      averageTemperature: meanTemp.toFixed(2),
      averageRainSum: meanRain.toFixed(2),
      modeWeathercode: mostFrequentWeatherCode,
      frequencyOfWeathercode: frequencyOfWeathercode,
    };
  });

  return averageTemperaturesPerDay
}
  

      useEffect(() => {
        if(Object.keys(weatherData).length > 0) {
          const sortedData = reorganiseWeatherData(weatherData, month)
          console.log(`here is the sortedData ${JSON.stringify(sortedData)}`)
          const calculatedAverages = calculateAverages(sortedData)

         setAverages(calculatedAverages)
         onDataFetch(averages)

        }
      }, [month, weatherData]);

      useEffect(() => {
        onDataFetch(averages);
      }, [averages, onDataFetch]);

 
      return null
    };


    
        
    export default WeatherData;