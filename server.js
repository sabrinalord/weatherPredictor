const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(cors());


app.get("/coordinates", async (req, res) => {
  const { location } = req.query;


  const options = {
    method: 'GET',
    url: 'https://opencage-geocoder.p.rapidapi.com/geocode/v1/json',
    params: {
      q: location,
      key: process.env.OPENCAGE_GEOCODE_API_KEY,
      language: 'en'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'opencage-geocoder.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);

    const latitude = response.data.results[0].geometry.lat;
    const longitude = response.data.results[0].geometry.lng;
    res.json({ latitude , longitude }); 

  } catch (error) {
    console.error(error);
  }
});


app.listen(8000, '0.0.0.0', () => console.log(`Server is running`))