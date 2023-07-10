import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherData = ({month, latitude, longitude, onDataFetch, weatherDataRangeInYears}) => {
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState({});
    const [averages, setAverages] = useState("");
    const [weatherDataByYear, setWeatherDataByYear]  = useState({});


    const getCurrentDate = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const date = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${date}`;
      return formattedDate;
    };

      var currentYear = new Date().getFullYear();
      var startYear = currentYear - (weatherDataRangeInYears - 1);

        
      useEffect(() => {
        const fetchWeatherData = async () => {
          try {
            if (latitude && longitude && month) {
              const startDate = `${startYear}-${month.value}-01`;
              const endDate = getCurrentDate();
              const endpoint = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=weathercode,temperature_2m_max,precipitation_hours,rain_sum&timezone=Europe%2FLondon`;
              console.log(endpoint)
              const response = await axios.get(endpoint);
              setWeatherData(response.data.daily);
              console.log(`weatherData is ${JSON.stringify(weatherData)}`)
              setError(null);
            }
          } catch (error) {
            setError('Failed to fetch weather data');
            console.error(error);
          }
        };
      
        fetchWeatherData();
      }, [month, latitude, longitude]);
      


      const reorganiseWeatherData = (weatherData, month) => {
        const { time, weathercode, temperature_2m_max, precipitation_hours, rain_sum } = weatherData;
        const sortedData = time.reduce((result, date, i) => {
          const dataYear = date.substring(0, 4);
          const dataMonth = date.substring(5, 7);
      
          if (dataMonth === month) {
            const day = date.substring(8, 10);
            let obj = result.find(obj => obj.date === day);
      
            if (!obj) {
              obj = {
                date: day,
                month: dataMonth,
                weathercode: [],
                temperature_2m_max: [],
                precipitation_hours: [],
                rain_sum: []
              };
              result.push(obj);
            }
      
            obj.weathercode.push({ year: dataYear, value: weathercode[i] });
            obj.temperature_2m_max.push({ year: dataYear, value: temperature_2m_max[i] });
            obj.rain_sum.push({ year: dataYear, value: rain_sum[i] });
            obj.precipitation_hours.push({ year: dataYear, value: precipitation_hours[i] });
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

      function countFrequency(array, target) {
        let count = 0;
        for (let i = 0; i < array.length; i++) {
          if (target === !0 ? array[i] !== 0 : array[i] === target) {
            count++;
          }
        }
        return count;
      }

    
      const calculateAverages = (sortedData) => {
        const averageTemperaturesPerDay = sortedData.map((item) => {
          const meanTemp = item.temperature_2m_max.reduce(
            (sum, temp) => sum + temp.value,
            0
          ) / item.temperature_2m_max.length;
      
          const meanRain = item.rain_sum.reduce(
            (sum, rain) => sum + rain.value,
            0
          ) / item.rain_sum.length;
      
          const meanPrecipitationHours = item.precipitation_hours.reduce(
            (sum, precipitation) => sum + precipitation.value,
            0
          ) / item.precipitation_hours.length;
      
          const mostFrequentWeatherCode = findMode(item.weathercode.map(code => code.value));
          const frequencyOfWeathercode = countFrequency(item.weathercode.map(code => code.value), mostFrequentWeatherCode);
          const frequencyOfRain = countFrequency(item.rain_sum.map(rain => rain.value), !0);
         
          return {
            date: item.date,
            averageTemperature: meanTemp.toFixed(2),
            averageRainSum: meanRain.toFixed(2),
            averagePrecipitationHours: meanPrecipitationHours.toFixed(2),
            modeWeatherCode: mostFrequentWeatherCode,
            frequencyOfWeathercode: frequencyOfWeathercode,
            frequencyOfRain: frequencyOfRain
          };
        });
      
        return averageTemperaturesPerDay;
      };
  

      useEffect(() => {
        if(Object.keys(weatherData).length > 0) {
          const sortedData = reorganiseWeatherData(weatherData, month.value)
          const calculatedAverages = calculateAverages(sortedData)

         setAverages(calculatedAverages)
         setWeatherDataByYear(sortedData)
        }
      }, [month, weatherData]);

      useEffect(() => {
        onDataFetch(averages, weatherDataByYear);
      }, [averages, onDataFetch]);

 
      return null
    };


    
        
    export default WeatherData;