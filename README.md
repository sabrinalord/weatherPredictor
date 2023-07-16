# weatherPredictor

The weatherPredictor app utilizes historical weather data from the openmeteo weather API to predict the weather. It uses average weather data from the last 10 years to make weather predictions.

## Features

- Weather prediction based on historical data
- Integration with the openmeteo weather API

## Installation

1. Clone the repository: git clone <https://github.com/sabrinalord/weatherPredictor.git>

2. Navigate to the root folder: cd weatherPredictor
3. Install dependencies: npm install
4. Build the app: npm run build
5. Start the backend server: npm run start:backend
6. Launch the frontend: npm run start:frontend


This will start the React app, and you can access it at http://localhost:3000.

## Configuration

To use the geocoding feature and translate location into coordinates, you need to set the following environment variables:

- `OPENCAGE_GEOCODE_API_KEY`
- `REACT_APP_RAPID_API_KEY`

Make sure to provide valid API keys for these variables.

## Contributing

Contributions to weatherPredictor are welcome! If you want to contribute to the project, please follow these steps:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit and push your changes to your forked repository
5. Submit a pull request


## Additional Resources

- Documentation for the open-meteo weather API: [link-to-api-docs](https://open-meteo.com/en/docs)
